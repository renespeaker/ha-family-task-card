import { LitElement, html, css, nothing, PropertyValues } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

/**
 * Family Task Card — a gamified family task / chore card for Home Assistant.
 *
 * MVP: a per-person board in the visual language of the Family Board Card.
 * It reads `todo.*` items live (Apple Reminders, Todoist, Google Tasks, Bring!,
 * local lists all expose these), renders tinted task tiles per person, and
 * checking a task writes back to the source list. A points / family-goal layer
 * sits on top. See ROADMAP.md for what comes next (kid mode, rewards, context
 * tasks, Bring! deep-links, config UI).
 */

const CARD_NAME = "Family Task Card";
const REPO = "https://github.com/renespeaker/ha-family-task-card";
const DEFAULT_POINTS = 10;

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

export class FamilyTaskCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: FamilyTaskConfig;

  /** todo entity_id -> its items, fetched via websocket. */
  @state() private _items: Record<string, TodoItem[]> = {};

  /** Remember each todo entity's last state signature to know when to refetch. */
  private _sig: Record<string, string> = {};
  private _loading = false;

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

  private _itemsFor(p: PersonConfig): OwnedItem[] {
    const out: OwnedItem[] = [];
    for (const entity of listsOf(p)) {
      for (const item of this._items[entity] ?? []) out.push({ entity, item });
    }
    return out;
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
    const pts = cfg.points_per_task ?? DEFAULT_POINTS;

    let familyEarned = 0;
    const columns = cfg.persons.map((p, idx) => {
      const items = this._itemsFor(p);
      const open = items.filter((o) => o.item.status !== "completed");
      const done = items.filter((o) => o.item.status === "completed");
      familyEarned += done.length * pts;
      return { p, idx, open, done };
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

        <div class="board">
          ${columns.map((c) => this._column(c.p, c.idx, c.open, c.done, pts))}
        </div>
      </ha-card>
    `;
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

  private _column(p: PersonConfig, idx: number, open: OwnedItem[], done: OwnedItem[], pts: number) {
    const color = personColor(p, idx);
    const name = this._personName(p, idx);
    const st = p.person ? this.hass?.states[p.person] : undefined;
    const pic = st?.attributes?.entity_picture as string | undefined;
    const initials = name.slice(0, 2).toUpperCase();
    const earned = done.length * pts;
    const showDone = this._config?.show_completed;

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
            <div class="pstatus">${open.length} offen · ⭐ ${earned}</div>
          </div>
        </div>

        <div class="tiles">
          ${
            open.length === 0 && (!showDone || done.length === 0)
              ? html`<div class="empty">Alles erledigt 🎉</div>`
              : nothing
          }
          ${open.map((o) => this._tile(o, color, false))}
          ${showDone ? done.map((o) => this._tile(o, color, true)) : nothing}
        </div>
      </div>
    `;
  }

  private _tile(owned: OwnedItem, color: string, completed: boolean) {
    const { entity, item } = owned;
    const emoji = emojiFor(item.summary);
    return html`
      <div
        class="tile ${completed ? "done" : ""}"
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
          ${item.due ? html`<div class="tile-due">${this._formatDue(item.due)}</div>` : nothing}
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
