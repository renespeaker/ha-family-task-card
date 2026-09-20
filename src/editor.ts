import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { FamilyTaskConfig } from "./ha-family-task-card";
import { langOf, t, type Lang } from "./localize";

interface PersonConfig {
  name?: string;
  person?: string;
  color?: string;
  lists?: string | string[];
  goal?: number;
  points_entity?: string;
}

/** Family Board Card palette, offered as one-click color chips. */
const PALETTE = [
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

/** Settings form (flat data). Sort/theme options are localized in `_schema()`. */
const SORT_VALUES = ["manual", "due", "alpha"] as const;
const THEME_VALUES = ["auto", "dark", "light"] as const;

/** One ha-form per person, with entity pickers filtered by domain. */
const PERSON_SCHEMA = [
  { name: "name", selector: { text: {} } },
  { name: "person", selector: { entity: { filter: { domain: "person" } } } },
  { name: "lists", selector: { entity: { filter: { domain: "todo" }, multiple: true } } },
  { name: "goal", selector: { number: { min: 0, max: 100000, mode: "box", step: 1 } } },
  {
    name: "points_entity",
    selector: { entity: { filter: { domain: "input_number" } } },
  },
];

type Bi = { de: string; en: string };

/** Bilingual labels / helpers for the forms (falls back to the raw key). */
const LABELS: Record<string, Bi> = {
  title: { de: "Titel", en: "Title" },
  theme: { de: "Farbschema", en: "Color scheme" },
  points_per_task: { de: "Punkte pro Aufgabe", en: "Points per task" },
  goal: { de: "Ziel (Punkte)", en: "Goal (points)" },
  show_completed: { de: "Erledigte anzeigen", en: "Show completed" },
  kid_mode: { de: "Kinder-Modus", en: "Kid mode" },
  highlight_overdue: { de: "Überfällige hervorheben", en: "Highlight overdue" },
  shopping_lists: { de: "Einkaufslisten (Bring!)", en: "Shopping lists (Bring!)" },
  shopping_points: { de: "Punkte pro Einkauf", en: "Points per shopping trip" },
  bring_deeplink: { de: "Bring!-Link", en: "Bring! link" },
  parent_pin: { de: "Eltern-PIN (Belohnungen)", en: "Parent PIN (rewards)" },
  level_size: { de: "Punkte pro Level", en: "Points per level" },
  show_leaderboard: { de: "Rangliste anzeigen", en: "Show leaderboard" },
  sort: { de: "Sortierung", en: "Sort" },
  hide_empty: { de: "Leere Personen ausblenden", en: "Hide empty persons" },
  due_soon: { de: "Bald fällig (Tage)", en: "Due soon (days)" },
  allow_add: { de: "Aufgabe-hinzufügen-Feld", en: "Add-task field" },
  name: { de: "Name", en: "Name" },
  person: { de: "Person (Avatar)", en: "Person (avatar)" },
  lists: { de: "Aufgabenlisten (todo.*)", en: "Task lists (todo.*)" },
  points_entity: { de: "Guthaben-Helfer (input_number)", en: "Points helper (input_number)" },
};
const HELPERS: Record<string, Bi> = {
  theme: {
    de: "Farbschema der Karte erzwingen (unabhängig vom Dashboard-Theme). Standard: dem HA-Theme folgen.",
    en: "Force the card's color scheme (independent of the dashboard theme). Default: follow the HA theme.",
  },
  points_per_task: {
    de: "Punkte je erledigter Aufgabe (Standard 10).",
    en: "Points per completed task (default 10).",
  },
  goal: {
    de: "Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",
    en: "Family points goal for the progress bar. 0 = off.",
  },
  show_completed: {
    de: "Erledigte Aufgaben ausgegraut mitanzeigen.",
    en: "Also show completed tasks (dimmed).",
  },
  kid_mode: {
    de: "Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",
    en: "Big, tappable layout for the kids' tablet (avatar switcher on top).",
  },
  highlight_overdue: {
    de: "Aufgaben mit überschrittenem Fälligkeitsdatum als dringend markieren (Standard an). Weitere Kontext-Regeln per YAML (context_rules).",
    en: "Mark tasks past their due date as urgent (default on). More context rules via YAML (context_rules).",
  },
  shopping_lists: {
    de: "Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",
    en: "These todo.* lists (e.g. Bring!) show as one 'shopping' tile; checking it off completes the whole trip.",
  },
  shopping_points: {
    de: "Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",
    en: "Points for a finished shopping trip (default = points per task).",
  },
  bring_deeplink: {
    de: "Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",
    en: "Target of the 'Open in Bring!' button (default web.getbring.com).",
  },
  parent_pin: {
    de: "PIN, die zum Einlösen einer Belohnung abgefragt wird (Eltern-Freigabe). Belohnungen selbst per YAML (rewards).",
    en: "PIN asked when redeeming a reward (parent approval). Rewards themselves via YAML (rewards).",
  },
  level_size: {
    de: "Punkte pro Level (aus verdienten Punkten). Standard 100, 0 = keine Level. Abzeichen optional per YAML (level_emojis).",
    en: "Points per level (from earned points). Default 100, 0 = no levels. Badges optional via YAML (level_emojis).",
  },
  show_leaderboard: {
    de: "Rangliste der Personen nach verdienten Punkten unter dem Board anzeigen.",
    en: "Show a ranking of persons by earned points under the board.",
  },
  sort: {
    de: "Reihenfolge der offenen Aufgaben je Person.",
    en: "Order of the open tasks per person.",
  },
  hide_empty: {
    de: "Personen ohne offene Aufgaben ausblenden.",
    en: "Hide persons that have no open tasks.",
  },
  due_soon: {
    de: "Aufgaben, die in den nächsten X Tagen fällig sind, hervorheben. 0 = aus.",
    en: "Highlight tasks due within the next X days. 0 = off.",
  },
  allow_add: {
    de: "Ein Eingabefeld pro Person zum Anlegen neuer Aufgaben (nur wo die Liste es unterstützt).",
    en: "An input field per person to add new tasks (only where the list supports it).",
  },
  person: {
    de: "Optional: person.* liefert Avatarbild & Anzeigename.",
    en: "Optional: person.* provides the avatar picture & display name.",
  },
  lists: {
    de: "Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",
    en: "One or more todo.* lists that belong to this person.",
  },
  points_entity: {
    de: "input_number, das die bereits eingelösten Punkte dieser Person speichert (Guthaben = verdient − eingelöst).",
    en: "input_number storing this person's already-redeemed points (balance = earned − spent).",
  },
};

export class FamilyTaskCardEditor extends LitElement implements LovelaceCardEditor {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: FamilyTaskConfig;

  public setConfig(config: FamilyTaskConfig): void {
    this._config = config;
  }

  private get _persons(): PersonConfig[] {
    return Array.isArray(this._config.persons) ? this._config.persons : [];
  }

  /** Settings data with shopping_lists normalized and defaults reflected. */
  private get _settingsData(): FamilyTaskConfig {
    const s = this._config.shopping_lists;
    const shopping_lists = Array.isArray(s) ? s : s ? [s] : [];
    // These default to on -> show the toggles on unless explicitly off.
    const highlight_overdue = this._config.highlight_overdue !== false;
    const allow_add = this._config.allow_add !== false;
    return { ...this._config, shopping_lists, highlight_overdue, allow_add };
  }

  private get _lang(): Lang {
    return langOf(this.hass);
  }

  /** Settings schema; sort options are localized here. */
  private _schema() {
    return [
      { name: "title", selector: { text: {} } },
      {
        name: "theme",
        selector: {
          select: {
            mode: "dropdown",
            options: THEME_VALUES.map((v) => ({ value: v, label: t(this.hass, `theme_${v}`) })),
          },
        },
      },
      {
        name: "points_per_task",
        selector: { number: { min: 0, max: 1000, mode: "box", step: 1 } },
      },
      { name: "goal", selector: { number: { min: 0, max: 100000, mode: "box", step: 1 } } },
      { name: "show_completed", selector: { boolean: {} } },
      { name: "kid_mode", selector: { boolean: {} } },
      { name: "highlight_overdue", selector: { boolean: {} } },
      { name: "allow_add", selector: { boolean: {} } },
      { name: "hide_empty", selector: { boolean: {} } },
      {
        name: "sort",
        selector: {
          select: {
            mode: "dropdown",
            options: SORT_VALUES.map((v) => ({ value: v, label: t(this.hass, `sort_${v}`) })),
          },
        },
      },
      { name: "due_soon", selector: { number: { min: 0, max: 60, mode: "box", step: 1 } } },
      {
        name: "shopping_lists",
        selector: { entity: { filter: { domain: "todo" }, multiple: true } },
      },
      {
        name: "shopping_points",
        selector: { number: { min: 0, max: 100000, mode: "box", step: 1 } },
      },
      { name: "bring_deeplink", selector: { text: {} } },
      { name: "parent_pin", selector: { text: {} } },
      { name: "level_size", selector: { number: { min: 0, max: 100000, mode: "box", step: 10 } } },
      { name: "show_leaderboard", selector: { boolean: {} } },
    ];
  }

  private _emit(config: FamilyTaskConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config } }));
  }

  private _label = (s: { name: string }): string => LABELS[s.name]?.[this._lang] ?? s.name;
  private _helper = (s: { name: string }): string | undefined => HELPERS[s.name]?.[this._lang];

  private _settingsChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const next = { ...ev.detail.value } as FamilyTaskConfig;
    // Drop empty optional fields so the YAML stays tidy.
    if (!next.title) delete next.title;
    if (!next.goal) delete next.goal;
    if (!next.show_completed) delete next.show_completed;
    if (!next.kid_mode) delete next.kid_mode;
    if (!next.shopping_points) delete next.shopping_points;
    if (!next.bring_deeplink) delete next.bring_deeplink;
    if (!next.parent_pin) delete next.parent_pin;
    if (!next.show_leaderboard) delete next.show_leaderboard;
    if (!next.hide_empty) delete next.hide_empty;
    if (!next.due_soon) delete next.due_soon;
    if (!next.sort || next.sort === "manual") delete next.sort;
    if (!next.theme || next.theme === "auto") delete next.theme;
    // Defaults are on: store only the explicit "off"; drop the redundant "on".
    if (next.highlight_overdue) delete next.highlight_overdue;
    if (next.allow_add) delete next.allow_add;
    if (Array.isArray(next.shopping_lists)) {
      if (next.shopping_lists.length === 0) delete next.shopping_lists;
      else if (next.shopping_lists.length === 1) next.shopping_lists = next.shopping_lists[0];
    }
    this._emit({ ...this._config, ...next, persons: this._persons });
  }

  private _personChanged(idx: number, ev: CustomEvent): void {
    ev.stopPropagation();
    const value = { ...ev.detail.value } as PersonConfig;
    if (!value.color) delete value.color;
    if (!value.goal) delete value.goal;
    if (!value.points_entity) delete value.points_entity;
    // Collapse a single-list array back to a string for tidy YAML.
    if (Array.isArray(value.lists)) {
      if (value.lists.length === 0) delete value.lists;
      else if (value.lists.length === 1) value.lists = value.lists[0];
    }
    const persons = this._persons.map((p, i) => (i === idx ? value : p));
    this._emit({ ...this._config, persons });
  }

  /** Normalize a person's lists to an array for the multi-entity picker. */
  private _personData(p: PersonConfig): PersonConfig {
    const lists = Array.isArray(p.lists) ? p.lists : p.lists ? [p.lists] : [];
    return { ...p, lists };
  }

  private _setPersonColor(idx: number, color?: string): void {
    const persons = this._persons.map((p, i) => {
      if (i !== idx) return p;
      const next = { ...p };
      if (color) next.color = color;
      else delete next.color;
      return next;
    });
    this._emit({ ...this._config, persons });
  }

  private _addPerson(): void {
    const persons = [...this._persons, { name: "", person: "", lists: "" }];
    this._emit({ ...this._config, persons });
  }

  private _removePerson(idx: number): void {
    const persons = this._persons.filter((_, i) => i !== idx);
    this._emit({ ...this._config, persons });
  }

  private _movePerson(idx: number, delta: number): void {
    const persons = [...this._persons];
    const target = idx + delta;
    if (target < 0 || target >= persons.length) return;
    [persons[idx], persons[target]] = [persons[target], persons[idx]];
    this._emit({ ...this._config, persons });
  }

  /** Seed a row per person.* entity that isn't configured yet (lists stay empty). */
  private _autoDetect(): void {
    const known = new Set(this._persons.map((p) => p.person).filter(Boolean));
    const detected = Object.keys(this.hass.states)
      .filter((e) => e.startsWith("person."))
      .filter((e) => !known.has(e))
      .map((e) => ({
        name: (this.hass.states[e].attributes?.friendly_name as string) || "",
        person: e,
        lists: "",
      }));
    if (detected.length === 0) return;
    const base = this._persons.filter((p) => p.name || p.person || (p.lists && p.lists.length));
    this._emit({ ...this._config, persons: [...base, ...detected] });
  }

  private _personColor(p: PersonConfig, idx: number): string {
    return p.color || PALETTE[idx % PALETTE.length];
  }

  protected render() {
    if (!this._config || !this.hass) return nothing;

    return html`
      <div class="editor">
        <ha-form
          .hass=${this.hass}
          .data=${this._settingsData}
          .schema=${this._schema()}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${this._settingsChanged}
        ></ha-form>

        <div class="section">
          <div class="section-head">
            <span>${t(this.hass, "persons")}</span>
            <button
              class="link"
              @click=${this._autoDetect}
              title=${t(this.hass, "detect_persons_hint")}
            >
              ${t(this.hass, "detect_persons")}
            </button>
          </div>

          ${this._persons.map((p, idx) => this._personRow(p, idx))}
          ${
            this._persons.length === 0
              ? html`<div class="empty">${t(this.hass, "no_persons")}</div>`
              : nothing
          }

          <button class="add" @click=${this._addPerson}>${t(this.hass, "add_person")}</button>
        </div>
      </div>
    `;
  }

  private _personRow(p: PersonConfig, idx: number) {
    const color = this._personColor(p, idx);
    const title = p.name || p.person || `${t(this.hass, "person_fallback")} ${idx + 1}`;
    return html`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${color}"></span>
          <span class="ptitle">${title}</span>
          <span class="spacer"></span>
          <ha-icon-button
            .path=${"M7,15L12,10L17,15H7Z"}
            title=${t(this.hass, "move_up")}
            .disabled=${idx === 0}
            @click=${() => this._movePerson(idx, -1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M7,10L12,15L17,10H7Z"}
            title=${t(this.hass, "move_down")}
            .disabled=${idx === this._persons.length - 1}
            @click=${() => this._movePerson(idx, 1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            title=${t(this.hass, "remove")}
            @click=${() => this._removePerson(idx)}
          ></ha-icon-button>
        </div>

        <ha-form
          .hass=${this.hass}
          .data=${this._personData(p)}
          .schema=${PERSON_SCHEMA}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${(e: CustomEvent) => this._personChanged(idx, e)}
        ></ha-form>

        <div class="colors">
          <span class="colors-label">${t(this.hass, "color")}</span>
          ${PALETTE.map(
            (c) => html`
              <button
                class="swatch ${p.color === c ? "active" : ""}"
                style="background:${c}"
                title=${c}
                @click=${() => this._setPersonColor(idx, c)}
              ></button>
            `,
          )}
          <button
            class="swatch auto ${!p.color ? "active" : ""}"
            title=${t(this.hass, "color_auto")}
            @click=${() => this._setPersonColor(idx, undefined)}
          >
            A
          </button>
        </div>
      </div>
    `;
  }

  static styles = css`
    .editor {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .link {
      background: none;
      border: none;
      color: var(--primary-color);
      cursor: pointer;
      font: inherit;
      padding: 0;
    }
    .person {
      border: 1px solid var(--divider-color);
      border-radius: 12px;
      padding: 10px 12px;
      margin-bottom: 10px;
    }
    .person-head {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      flex: none;
    }
    .ptitle {
      font-weight: 600;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .colors {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .colors-label {
      font-size: 0.85em;
      color: var(--secondary-text-color);
      margin-right: 4px;
    }
    .swatch {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      border: 2px solid transparent;
      cursor: pointer;
      padding: 0;
    }
    .swatch.active {
      border-color: var(--primary-text-color);
    }
    .swatch.auto {
      background: var(--secondary-background-color);
      color: var(--primary-text-color);
      font-size: 11px;
      font-weight: 700;
      border-radius: 6px;
    }
    .add {
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      border: 1px dashed var(--divider-color);
      background: none;
      color: var(--primary-color);
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }
    .empty {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      padding: 6px 2px 10px;
    }
  `;
}

if (!customElements.get("family-task-card-editor")) {
  customElements.define("family-task-card-editor", FamilyTaskCardEditor);
}
