import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

/**
 * Family Task Card — a gamified family task / chore card for Home Assistant.
 *
 * A per-person board in the visual language of the Family Board Card. It reads
 * `todo.*` items live (Apple Reminders, Todoist, Google Tasks, Bring!, local
 * lists all expose these), renders tinted task tiles per person, and checking a
 * task writes back to the source list. On top: a points / family-goal layer, a
 * big tappable kid mode, Bring!/shopping lists shown as one aggregated "Einkauf"
 * tile, and context rules that react to Home Assistant state (hide / highlight /
 * mark urgent). See ROADMAP.md for what comes next (rewards, kiosk moment).
 */

const CARD_NAME = "Family Task Card";
const REPO = "https://github.com/renespeaker/ha-family-task-card";
const DEFAULT_POINTS = 10;
const DEFAULT_BRING_LINK = "https://web.getbring.com";

/* Same person palette as the Family Board Card, for one shared look. */
const FALLBACK_COLORS = [
  "#8B7CF6",
  "#34D399",
  "#FBBF24",
  "#FB7185",
  "#22D3EE",
  "#C084FC",
  "#A3E635",
  "#FB923C",
  "#F472B6",
  "#60A5FA",
];

/* Lightweight auto-emoji for common chores (matches the board's playful feel). */
const EMOJI_RULES: Array<[RegExp, string]> = [
  [/müll|abfall|tonne|papier|restmüll|gelber sack/i, "🗑️"],
  [/wäsche|waschen|laundry/i, "🧺"],
  [/spül|geschirr|dishes|abwasch/i, "🍽️"],
  [/staub|wisch|putz|clean|saug|fegen|kehren/i, "🧹"],
  [/einkauf|shopping|bring|supermarkt|lebensmittel/i, "🛒"],
  [/hund|gassi|dog/i, "🐕"],
  [/katze|cat/i, "🐈"],
  [/gieß|blumen|pflanze|garten|rasen|plant|water/i, "🪴"],
  [/hausaufgabe|homework|lernen|üben/i, "📚"],
  [/zimmer|aufräum|tidy|room/i, "🧸"],
  [/bad|dusche|wc|toilette|bathroom/i, "🛁"],
  [/koch|cook|essen|dinner|abendessen/i, "🍳"],
  [/tisch|decken|table/i, "🍴"],
  [/bett|bed/i, "🛏️"],
  [/auto|car|tanken/i, "🚗"],
];

interface PersonConfig {
  name?: string;
  person?: string; // person.* entity -> avatar (entity_picture) + friendly name
  color?: string; // optional override; default falls back to the palette
  lists?: string | string[]; // todo.* entity/entities that belong to this person
  goal?: number; // optional per-person points goal
}

export interface FamilyTaskConfig extends LovelaceCardConfig {
  persons: PersonConfig[];
  title?: string;
  points_per_task?: number; // points earned per completed task. default 10
  goal?: number; // family points goal -> progress bar
  show_completed?: boolean; // also list completed tasks (dimmed). default false
  kid_mode?: boolean; // big, tappable single-child layout (wall tablet). default false
  shopping_lists?: string | string[]; // todo.* lists shown as one aggregated "Einkauf" tile
  shopping_points?: number; // points for a finished shopping trip. default = points_per_task
  bring_deeplink?: string; // URL for the "In Bring! öffnen" button. default web.getbring.com
  context_rules?: ContextRule[]; // react to HA state: hide / highlight / mark urgent
  highlight_overdue?: boolean; // mark tasks past their due date as urgent. default true
}

/**
 * A context rule reacts to Home Assistant state. When its condition on `entity`
 * is met, matching tasks get its `effect`: hidden (e.g. skip watering when it
 * rains), highlighted, or marked urgent (e.g. bins out the evening before).
 */
interface ContextRule {
  entity: string; // the HA entity to evaluate
  effect: "hide" | "highlight" | "urgent";
  match?: string; // regex on the task summary (case-insensitive). default: all tasks
  lists?: string | string[]; // restrict to these todo.* lists
  state?: string | string[]; // condition: entity state equals one of these
  above?: number; // numeric condition: entity state > above
  below?: number; // numeric condition: entity state < below
  invert?: boolean; // flip the condition (e.g. apply when NOT home)
  label?: string; // chip shown on highlighted / urgent tasks
}

interface TodoItem {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
  due?: string;
  description?: string;
}

/** A todo item paired with the entity it lives in, so write-back knows the target. */
interface OwnedItem {
  entity: string;
  item: TodoItem;
}

type ContextFlag = "none" | "highlight" | "urgent";

/** An open task plus the context flag / label the rules gave it. */
interface DecoratedItem extends OwnedItem {
  flag: ContextFlag;
  label?: string;
}

/** A shopping list (e.g. Bring!) shown as one aggregated "Einkauf" tile. */
interface ShoppingEntry {
  entity: string;
  name: string;
  open: OwnedItem[];
}

/** Everything one person's column / kid view needs, computed once. */
interface PersonView {
  tasksOpen: DecoratedItem[];
  tasksDone: OwnedItem[];
  shopOpen: ShoppingEntry[];
  earned: number;
  openCount: number;
}

function personColor(p: PersonConfig, idx: number): string {
  return p.color || FALLBACK_COLORS[idx % FALLBACK_COLORS.length];
}

function listsOf(p: PersonConfig): string[] {
  if (!p.lists) return [];
  return (Array.isArray(p.lists) ? p.lists : [p.lists]).filter(Boolean);
}

function emojiFor(summary: string): string {
  for (const [re, emoji] of EMOJI_RULES) if (re.test(summary)) return emoji;
  return "📝";
}

/** A task is overdue once its due date/time has fully passed. */
function isOverdue(item: TodoItem): boolean {
  if (!item.due) return false;
  // Date-only due -> overdue after end of that day; datetime -> exact moment.
  const d = new Date(item.due.length <= 10 ? `${item.due}T23:59:59` : item.due);
  return !isNaN(d.getTime()) && d.getTime() < Date.now();
}

/** Does a rule target this task (by title regex and/or list)? */
function ruleApplies(rule: ContextRule, summary: string, entity: string): boolean {
  if (rule.lists) {
    const arr = Array.isArray(rule.lists) ? rule.lists : [rule.lists];
    if (!arr.includes(entity)) return false;
  }
  if (rule.match) {
    try {
      if (!new RegExp(rule.match, "i").test(summary)) return false;
    } catch {
      return false; // a bad regex simply never matches
    }
  }
  return true;
}

/** Is a rule's condition on its entity currently met? */
function ruleConditionMet(rule: ContextRule, st: { state: string } | undefined): boolean {
  let met = false;
  if (st) {
    if (rule.state !== undefined) {
      const arr = Array.isArray(rule.state) ? rule.state : [rule.state];
      met = arr.includes(st.state);
    } else if (rule.above !== undefined || rule.below !== undefined) {
      const n = Number(st.state);
      if (!isNaN(n)) {
        met = true;
        if (rule.above !== undefined && !(n > rule.above)) met = false;
        if (rule.below !== undefined && !(n < rule.below)) met = false;
      }
    } else {
      // No explicit condition -> treat a truthy state as met (on/home/open/...).
      met = !["off", "unavailable", "unknown", "", "none", "false"].includes(
        st.state.toLowerCase(),
      );
    }
  }
  return rule.invert ? !met : met;
}

export class FamilyTaskCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: FamilyTaskConfig;

  /** todo entity_id -> its items, fetched via websocket. */
  @state() private _items: Record<string, TodoItem[]> = {};

  /** Remember each todo entity's last state signature to know when to refetch. */
  private _sig: Record<string, string> = {};
  private _loading = false;

  /** Kid mode: index of the child currently in focus, and a brief celebration. */
  @state() private _activeKid = 0;
  @state() private _burst = false;
  private _burstTimer?: number;

  public static async getConfigElement() {
    await import("./editor");
    return document.createElement("family-task-card-editor");
  }

  public static getStubConfig(hass?: HomeAssistant): FamilyTaskConfig {
    const firstTodo = hass
      ? Object.keys(hass.states).find((e) => e.startsWith("todo."))
      : undefined;
    return {
      type: "custom:family-task-card",
      title: "Familien-Aufgaben",
      persons: [{ name: "Person 1", lists: firstTodo ? [firstTodo] : [] }],
    };
  }

  public setConfig(config: FamilyTaskConfig): void {
    if (!config || !Array.isArray(config.persons)) {
      throw new Error('"persons" muss eine Liste sein (mind. eine Person).');
    }
    this._config = { points_per_task: DEFAULT_POINTS, ...config };
  }

  public getCardSize(): number {
    const rows = this._config?.persons?.length ?? 1;
    return 2 + Math.min(rows, 4);
  }

  protected willUpdate(changed: PropertyValues): void {
    if ((changed.has("hass") || changed.has("_config")) && this.hass && this._config) {
      this._refresh();
    }
  }

  /** Fetch todo items for any configured list whose entity state changed. */
  private async _refresh(): Promise<void> {
    if (!this.hass || !this._config || this._loading) return;
    const entities = new Set<string>();
    for (const p of this._config.persons) for (const e of listsOf(p)) entities.add(e);

    const stale: string[] = [];
    for (const e of entities) {
      const st = this.hass.states[e];
      const sig = st ? `${st.state}|${st.last_changed}` : "missing";
      if (this._sig[e] !== sig) {
        this._sig[e] = sig;
        stale.push(e);
      }
    }
    if (stale.length === 0) return;

    this._loading = true;
    try {
      const next: Record<string, TodoItem[]> = { ...this._items };
      await Promise.all(
        stale.map(async (entity_id) => {
          try {
            const res = await this.hass!.callWS<{ items: TodoItem[] }>({
              type: "todo/item/list",
              entity_id,
            });
            next[entity_id] = res?.items ?? [];
          } catch (err) {
            // Entity might not support listing yet; keep it empty rather than break.
            next[entity_id] = [];
          }
        }),
      );
      this._items = next;
    } finally {
      this._loading = false;
    }
  }

  private _shoppingSet(): Set<string> {
    const raw = this._config?.shopping_lists;
    const arr = raw ? (Array.isArray(raw) ? raw : [raw]) : [];
    return new Set(arr.filter(Boolean));
  }

  private _listName(entity: string): string {
    return (this.hass?.states[entity]?.attributes?.friendly_name as string) || "Einkauf";
  }

  private _bringLink(): string {
    return this._config?.bring_deeplink || DEFAULT_BRING_LINK;
  }

  /** Split a person's lists into tasks + shopping trips and tally points. */
  private _personView(p: PersonConfig): PersonView {
    const cfg = this._config!;
    const pts = cfg.points_per_task ?? DEFAULT_POINTS;
    const shopPts = cfg.shopping_points ?? pts;
    const shopping = this._shoppingSet();

    const rawOpen: OwnedItem[] = [];
    const tasksDone: OwnedItem[] = [];
    const shopOpen: ShoppingEntry[] = [];
    let earned = 0;

    for (const entity of listsOf(p)) {
      const items: OwnedItem[] = (this._items[entity] ?? []).map((item) => ({ entity, item }));
      if (shopping.has(entity)) {
        const open = items.filter((o) => o.item.status !== "completed");
        const done = items.filter((o) => o.item.status === "completed");
        if (open.length > 0) shopOpen.push({ entity, name: this._listName(entity), open });
        // Best-effort, stateless: a trip counts as done when items were checked
        // off and none remain open. Real points history moves to the integration.
        else if (done.length > 0) earned += shopPts;
      } else {
        for (const o of items) (o.item.status === "completed" ? tasksDone : rawOpen).push(o);
      }
    }
    // Context rules can hide, highlight or flag open tasks as urgent.
    const tasksOpen = this._decorate(rawOpen);
    earned += tasksDone.length * pts;
    return {
      tasksOpen,
      tasksDone,
      shopOpen,
      earned,
      openCount: tasksOpen.length + shopOpen.length,
    };
  }

  /** Apply context rules + overdue detection to open tasks; drop hidden ones. */
  private _decorate(open: OwnedItem[]): DecoratedItem[] {
    const rules = this._config?.context_rules ?? [];
    const overdueOn = this._config?.highlight_overdue !== false;
    const out: DecoratedItem[] = [];

    for (const o of open) {
      let hidden = false;
      let flag: ContextFlag = "none";
      let label: string | undefined;

      for (const rule of rules) {
        if (!ruleApplies(rule, o.item.summary, o.entity)) continue;
        if (!ruleConditionMet(rule, this.hass?.states[rule.entity])) continue;
        if (rule.effect === "hide") {
          hidden = true;
          break;
        }
        if (rule.effect === "urgent") {
          flag = "urgent";
          label = rule.label ?? label;
        } else if (rule.effect === "highlight" && flag !== "urgent") {
          flag = "highlight";
          label = label ?? rule.label;
        }
      }
      if (hidden) continue;

      if (overdueOn && isOverdue(o.item)) {
        flag = "urgent";
        label = label ?? "Überfällig";
      }
      out.push({ ...o, flag, label });
    }

    // Urgent first, then highlighted, then the rest — order within stays stable.
    const rank = (f: ContextFlag) => (f === "urgent" ? 0 : f === "highlight" ? 1 : 2);
    return out
      .map((d, i) => ({ d, i }))
      .sort((a, b) => rank(a.d.flag) - rank(b.d.flag) || a.i - b.i)
      .map(({ d }) => d);
  }

  /** Complete a whole shopping trip: check off every open item (syncs to source). */
  private async _completeShopping(entry: ShoppingEntry): Promise<void> {
    await Promise.all(entry.open.map((o) => this._toggle(o.entity, o.item)));
  }

  private _personName(p: PersonConfig, idx: number): string {
    return (
      p.name ||
      (p.person ? (this.hass?.states[p.person]?.attributes?.friendly_name as string) : "") ||
      `Person ${idx + 1}`
    );
  }

  private async _toggle(entityId: string, item: TodoItem): Promise<void> {
    if (!this.hass) return;
    const status = item.status === "completed" ? "needs_action" : "completed";
    // Optimistic update for instant feedback; _refresh reconciles on state change.
    this._items = {
      ...this._items,
      [entityId]: (this._items[entityId] ?? []).map((it) =>
        it.uid === item.uid ? { ...it, status } : it,
      ),
    };
    try {
      await this.hass.callService("todo", "update_item", {
        entity_id: entityId,
        item: item.uid,
        status,
      });
    } catch (err) {
      // Revert on failure.
      this._sig[entityId] = "";
      this._refresh();
    }
  }

  protected render() {
    if (!this._config) return nothing;
    const cfg = this._config;
    if (cfg.kid_mode && cfg.persons.length > 0) return this._renderKid();
    let familyEarned = 0;
    const columns = cfg.persons.map((p, idx) => {
      const view = this._personView(p);
      familyEarned += view.earned;
      return { p, idx, view };
    });

    return html`
      <ha-card>
        <div class="head">
          <div class="badge">🧹</div>
          <div class="head-text">
            <div class="title">${cfg.title || CARD_NAME}</div>
            <div class="sub">Familien-Aufgaben</div>
          </div>
          ${this._goalBar(familyEarned)}
        </div>

        <div class="board">${columns.map((c) => this._column(c.p, c.idx, c.view))}</div>
      </ha-card>
    `;
  }

  /* ---- kid mode --------------------------------------------------- */

  private _renderKid() {
    const cfg = this._config!;
    const persons = cfg.persons;
    const idx = Math.min(this._activeKid, persons.length - 1);
    const p = persons[idx];
    const color = personColor(p, idx);
    const name = this._personName(p, idx);
    const view = this._personView(p);
    const earned = view.earned;
    const openCount = view.openCount;
    const goal = p.goal ?? cfg.goal;
    const pct = goal && goal > 0 ? Math.min(100, Math.round((earned / goal) * 100)) : 0;
    const allDone = openCount === 0;

    return html`
      <ha-card class="kid" style="--pc:${color}">
        ${
          persons.length > 1
            ? html`<div class="kid-people">
                ${persons.map((pp, i) => this._kidAvatar(pp, i, i === idx))}
              </div>`
            : nothing
        }

        <div class="kid-hero">
          ${this._kidAvatar(p, idx, false, true)}
          <div class="kid-hero-text">
            <div class="kid-name">${name}</div>
            <div class="kid-stars">
              ⭐ ${earned}${openCount ? html` · ${openCount} offen` : nothing}
            </div>
          </div>
        </div>

        ${
          goal && goal > 0
            ? html`<div class="kid-bar"><div class="kid-fill" style="width:${pct}%"></div></div>`
            : nothing
        }

        <div class="kid-tasks">
          ${
            allDone
              ? html`<div class="kid-alldone">
                  🎉
                  <div>Alles geschafft!</div>
                </div>`
              : html`${view.shopOpen.map((s) => this._kidShopping(s, color))}
                ${view.tasksOpen.map((o) => this._kidTask(o, color))}`
          }
        </div>

        ${this._burst ? html`<div class="burst">⭐</div>` : nothing}
      </ha-card>
    `;
  }

  private _kidAvatar(p: PersonConfig, idx: number, active: boolean, big = false) {
    const color = personColor(p, idx);
    const name = this._personName(p, idx);
    const st = p.person ? this.hass?.states[p.person] : undefined;
    const pic = st?.attributes?.entity_picture as string | undefined;
    const initials = name.slice(0, 2).toUpperCase();
    const cls = `kid-av ${big ? "big" : ""} ${active ? "active" : ""}`;
    const style = pic
      ? `background-image:url('${pic}');box-shadow:0 0 0 3px ${color}`
      : `background:${color}`;
    const inner = pic ? nothing : html`<span>${initials}</span>`;
    return big
      ? html`<div class="${cls}" style="${style}">${inner}</div>`
      : html`<button
          class="${cls}"
          style="${style}"
          title=${name}
          @click=${() => (this._activeKid = idx)}
        >
          ${inner}
        </button>`;
  }

  private _kidTask(owned: DecoratedItem, color: string) {
    const { entity, item, flag, label } = owned;
    const emoji = flag === "urgent" ? "⚠️" : emojiFor(item.summary);
    return html`
      <button
        class="kid-task ${flag}"
        style="--pc:${color}"
        @click=${() => this._kidComplete(entity, item)}
      >
        <span class="kid-emoji">${emoji}</span>
        <span class="kid-task-title">
          ${item.summary}${label ? html`<span class="kid-sub">${label}</span>` : nothing}
        </span>
        <span class="kid-check">◯</span>
      </button>
    `;
  }

  private _kidShopping(entry: ShoppingEntry, color: string) {
    return html`
      <button
        class="kid-task"
        style="--pc:${color}"
        @click=${() => this._kidCompleteShopping(entry)}
      >
        <span class="kid-emoji">🛒</span>
        <span class="kid-task-title">
          ${entry.name}
          <span class="kid-sub">${entry.open.length} Artikel</span>
        </span>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          Öffnen
        </a>
      </button>
    `;
  }

  private _celebrate(): void {
    this._burst = true;
    if (this._burstTimer) clearTimeout(this._burstTimer);
    this._burstTimer = window.setTimeout(() => {
      this._burst = false;
    }, 900);
  }

  private async _kidComplete(entity: string, item: TodoItem): Promise<void> {
    this._celebrate();
    await this._toggle(entity, item);
  }

  private async _kidCompleteShopping(entry: ShoppingEntry): Promise<void> {
    this._celebrate();
    await this._completeShopping(entry);
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this._burstTimer) clearTimeout(this._burstTimer);
  }

  private _goalBar(earned: number) {
    const goal = this._config?.goal;
    if (!goal || goal <= 0) {
      return html`<div class="fam-pts">⭐ ${earned}</div>`;
    }
    const pct = Math.max(0, Math.min(100, Math.round((earned / goal) * 100)));
    return html`
      <div class="goal">
        <div class="goal-top">
          <span>⭐ ${earned}</span><span class="goal-target">Ziel ${goal}</span>
        </div>
        <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
      </div>
    `;
  }

  private _column(p: PersonConfig, idx: number, view: PersonView) {
    const color = personColor(p, idx);
    const name = this._personName(p, idx);
    const st = p.person ? this.hass?.states[p.person] : undefined;
    const pic = st?.attributes?.entity_picture as string | undefined;
    const initials = name.slice(0, 2).toUpperCase();
    const showDone = this._config?.show_completed;
    const isEmpty = view.openCount === 0 && (!showDone || view.tasksDone.length === 0);

    return html`
      <div class="col" style="--pc:${color}">
        <div class="col-head">
          ${
            pic
              ? html`<div
                  class="avatar"
                  style="background-image:url('${pic}');box-shadow:0 0 0 2px ${color}55"
                ></div>`
              : html`<div class="avatar initials" style="background:${color}">${initials}</div>`
          }
          <div class="col-meta">
            <div class="pname">${name}</div>
            <div class="pstatus">${view.openCount} offen · ⭐ ${view.earned}</div>
          </div>
        </div>

        <div class="tiles">
          ${isEmpty ? html`<div class="empty">Alles erledigt 🎉</div>` : nothing}
          ${view.shopOpen.map((s) => this._shoppingTile(s, color))}
          ${view.tasksOpen.map((o) => this._tile(o, color, false, o.flag, o.label))}
          ${showDone ? view.tasksDone.map((o) => this._tile(o, color, true)) : nothing}
        </div>
      </div>
    `;
  }

  private _shoppingTile(entry: ShoppingEntry, color: string) {
    const count = entry.open.length;
    return html`
      <div
        class="tile shopping"
        style="--pc:${color}"
        role="button"
        tabindex="0"
        @click=${() => this._completeShopping(entry)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this._completeShopping(entry);
          }
        }}
      >
        <div class="check"></div>
        <div class="tile-emoji">🛒</div>
        <div class="tile-text">
          <div class="tile-title">${entry.name}</div>
          <div class="tile-due">${count} Artikel</div>
        </div>
        <a
          class="bring-open"
          href=${this._bringLink()}
          target="_blank"
          rel="noopener"
          title="In Bring! öffnen"
          @click=${(e: MouseEvent) => e.stopPropagation()}
        >
          Öffnen
        </a>
      </div>
    `;
  }

  private _tile(
    owned: OwnedItem,
    color: string,
    completed: boolean,
    flag: ContextFlag = "none",
    label?: string,
  ) {
    const { entity, item } = owned;
    const emoji = flag === "urgent" ? "⚠️" : emojiFor(item.summary);
    return html`
      <div
        class="tile ${completed ? "done" : flag}"
        style="--pc:${color}"
        role="button"
        tabindex="0"
        @click=${() => this._toggle(entity, item)}
        @keydown=${(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            this._toggle(entity, item);
          }
        }}
      >
        <div class="check">${completed ? "✓" : ""}</div>
        <div class="tile-emoji">${emoji}</div>
        <div class="tile-text">
          <div class="tile-title">${item.summary}</div>
          ${
            label
              ? html`<div class="tile-flag">${label}</div>`
              : item.due
                ? html`<div class="tile-due">${this._formatDue(item.due)}</div>`
                : nothing
          }
        </div>
      </div>
    `;
  }

  private _formatDue(due: string): string {
    // `due` is a date (YYYY-MM-DD) or datetime; render short & locale-aware.
    const d = new Date(due.length <= 10 ? `${due}T00:00:00` : due);
    if (isNaN(d.getTime())) return due;
    const lang = this.hass?.locale?.language || "de";
    const today = new Date();
    const sameDay = d.toDateString() === today.toDateString();
    if (sameDay) return "heute";
    return new Intl.DateTimeFormat(lang, {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(d);
  }

  static styles = css`
    :host {
      --pc: var(--primary-color);
    }
    ha-card {
      padding: 16px;
      font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, inherit));
      color: var(--primary-text-color);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .head-text {
      flex: 1 1 auto;
      min-width: 0;
    }
    .badge {
      width: 42px;
      height: 42px;
      border-radius: 12px;
      flex: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color, #fff));
    }
    .title {
      font-size: 1.2em;
      font-weight: 700;
      line-height: 1.2;
    }
    .sub {
      color: var(--secondary-text-color);
      font-size: 0.85em;
      margin-top: 2px;
    }
    .fam-pts {
      font-weight: 700;
      font-size: 1.05em;
      white-space: nowrap;
    }
    .goal {
      width: 140px;
      flex: none;
    }
    .goal-top {
      display: flex;
      justify-content: space-between;
      font-size: 0.8em;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .goal-target {
      color: var(--secondary-text-color);
      font-weight: 500;
    }
    .bar {
      height: 8px;
      border-radius: 6px;
      background: var(--divider-color);
      overflow: hidden;
    }
    .fill {
      height: 100%;
      border-radius: 6px;
      background: var(--primary-color);
      transition: width 0.3s ease;
    }
    .board {
      margin-top: 16px;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 12px;
    }
    .col {
      background: color-mix(in srgb, var(--pc) 6%, var(--card-background-color, #fff));
      border: 1px solid var(--divider-color);
      border-radius: 14px;
      padding: 10px;
      min-width: 0;
    }
    .col-head {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 8px;
    }
    .avatar {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      flex: none;
    }
    .avatar.initials {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #11181f;
      font-weight: 700;
      font-size: 13px;
    }
    .col-meta {
      min-width: 0;
    }
    .pname {
      font-weight: 600;
      font-size: 0.98em;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .pstatus {
      font-size: 0.78em;
      color: var(--secondary-text-color);
    }
    .tiles {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .empty {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      padding: 8px 4px;
    }
    .tile {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px;
      border-radius: 10px;
      cursor: pointer;
      background: color-mix(in srgb, var(--pc) 12%, var(--card-background-color, #fff));
      border-left: 3px solid var(--pc);
      transition:
        transform 0.08s ease,
        opacity 0.2s ease;
    }
    .tile:hover {
      transform: translateY(-1px);
    }
    .tile:focus-visible {
      outline: 2px solid var(--pc);
      outline-offset: 1px;
    }
    .tile.done {
      opacity: 0.55;
    }
    .tile.done .tile-title {
      text-decoration: line-through;
    }
    .tile.highlight {
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--pc) 55%, transparent);
    }
    .tile.urgent {
      background: color-mix(
        in srgb,
        var(--error-color, #db4437) 16%,
        var(--card-background-color, #fff)
      );
      border-left-color: var(--error-color, #db4437);
    }
    .tile.urgent .check {
      border-color: var(--error-color, #db4437);
    }
    .tile-flag {
      display: inline-block;
      margin-top: 3px;
      font-size: 0.72em;
      font-weight: 700;
      color: var(--error-color, #db4437);
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .tile.highlight .tile-flag {
      color: color-mix(in srgb, var(--pc) 80%, var(--primary-text-color));
    }
    .check {
      width: 22px;
      height: 22px;
      flex: none;
      border-radius: 6px;
      border: 2px solid var(--pc);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      background: transparent;
    }
    .tile.done .check {
      background: var(--pc);
    }
    .tile-emoji {
      font-size: 18px;
      flex: none;
    }
    .tile-text {
      min-width: 0;
    }
    .tile-title {
      font-size: 0.95em;
      font-weight: 500;
      line-height: 1.25;
      overflow-wrap: anywhere;
    }
    .tile-due {
      font-size: 0.75em;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .tile.shopping .tile-text {
      flex: 1 1 auto;
    }
    .bring-open {
      flex: none;
      align-self: center;
      padding: 5px 10px;
      border-radius: 999px;
      font-size: 0.78em;
      font-weight: 700;
      text-decoration: none;
      color: #fff;
      background: var(--pc);
      white-space: nowrap;
    }

    /* ---- kid mode ---- */
    ha-card.kid {
      padding: 18px;
      position: relative;
      overflow: hidden;
    }
    .kid-people {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 14px;
    }
    .kid-av {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #11181f;
      font-weight: 800;
      font-size: 16px;
      opacity: 0.55;
      transition:
        opacity 0.15s ease,
        transform 0.15s ease;
    }
    .kid-av.active {
      opacity: 1;
      transform: scale(1.08);
    }
    .kid-av.big {
      width: 72px;
      height: 72px;
      font-size: 24px;
      opacity: 1;
    }
    .kid-hero {
      display: flex;
      align-items: center;
      gap: 14px;
      margin-bottom: 12px;
    }
    .kid-name {
      font-size: 1.7em;
      font-weight: 800;
      line-height: 1.1;
    }
    .kid-stars {
      font-size: 1.05em;
      font-weight: 700;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .kid-bar {
      height: 14px;
      border-radius: 10px;
      background: var(--divider-color);
      overflow: hidden;
      margin-bottom: 16px;
    }
    .kid-fill {
      height: 100%;
      border-radius: 10px;
      background: var(--pc);
      transition: width 0.4s ease;
    }
    .kid-tasks {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .kid-task {
      display: flex;
      align-items: center;
      gap: 14px;
      width: 100%;
      padding: 16px 18px;
      border-radius: 16px;
      border: none;
      cursor: pointer;
      text-align: left;
      font: inherit;
      color: var(--primary-text-color);
      background: color-mix(in srgb, var(--pc) 16%, var(--card-background-color, #fff));
      border-left: 6px solid var(--pc);
      transition:
        transform 0.1s ease,
        box-shadow 0.1s ease;
    }
    .kid-task:hover {
      transform: translateY(-2px);
    }
    .kid-task:active {
      transform: scale(0.98);
    }
    .kid-task.highlight {
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--pc) 60%, transparent);
    }
    .kid-task.urgent {
      background: color-mix(
        in srgb,
        var(--error-color, #db4437) 20%,
        var(--card-background-color, #fff)
      );
      border-left-color: var(--error-color, #db4437);
    }
    .kid-task.urgent .kid-sub {
      color: var(--error-color, #db4437);
    }
    .kid-emoji {
      font-size: 34px;
      flex: none;
    }
    .kid-task-title {
      flex: 1 1 auto;
      font-size: 1.25em;
      font-weight: 700;
      overflow-wrap: anywhere;
    }
    .kid-sub {
      display: block;
      font-size: 0.7em;
      font-weight: 600;
      color: var(--secondary-text-color);
      margin-top: 2px;
    }
    .kid-check {
      flex: none;
      font-size: 30px;
      color: var(--pc);
      font-weight: 700;
    }
    .kid-alldone {
      text-align: center;
      padding: 28px 10px;
      font-size: 1.4em;
      font-weight: 800;
    }
    .kid-alldone > div {
      font-size: 0.75em;
      margin-top: 6px;
    }
    .burst {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 120px;
      pointer-events: none;
      animation: burst 0.9s ease-out forwards;
    }
    @keyframes burst {
      0% {
        transform: scale(0.3);
        opacity: 0;
      }
      30% {
        transform: scale(1.1);
        opacity: 1;
      }
      100% {
        transform: scale(1.6);
        opacity: 0;
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .burst {
        animation: none;
        display: none;
      }
    }
  `;
}

if (!customElements.get("family-task-card")) {
  customElements.define("family-task-card", FamilyTaskCard);
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "family-task-card",
  name: CARD_NAME,
  description:
    "Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!).",
  preview: true,
  documentationURL: REPO,
});
