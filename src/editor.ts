import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCardEditor } from "custom-card-helpers";
import type { FamilyTaskConfig } from "./ha-family-task-card";

interface PersonConfig {
  name?: string;
  person?: string;
  color?: string;
  lists?: string | string[];
  goal?: number;
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

/** Settings form (flat data). */
const SETTINGS_SCHEMA = [
  { name: "title", selector: { text: {} } },
  {
    name: "points_per_task",
    selector: { number: { min: 0, max: 1000, mode: "box", step: 1 } },
  },
  { name: "goal", selector: { number: { min: 0, max: 100000, mode: "box", step: 1 } } },
  { name: "show_completed", selector: { boolean: {} } },
  { name: "kid_mode", selector: { boolean: {} } },
  {
    name: "shopping_lists",
    selector: { entity: { filter: { domain: "todo" }, multiple: true } },
  },
  {
    name: "shopping_points",
    selector: { number: { min: 0, max: 100000, mode: "box", step: 1 } },
  },
  { name: "bring_deeplink", selector: { text: {} } },
];

/** One ha-form per person, with entity pickers filtered by domain. */
const PERSON_SCHEMA = [
  { name: "name", selector: { text: {} } },
  { name: "person", selector: { entity: { filter: { domain: "person" } } } },
  { name: "lists", selector: { entity: { filter: { domain: "todo" }, multiple: true } } },
  { name: "goal", selector: { number: { min: 0, max: 100000, mode: "box", step: 1 } } },
];

/** German labels / helpers for the forms (falls back to the raw key). */
const LABELS: Record<string, string> = {
  title: "Titel",
  points_per_task: "Punkte pro Aufgabe",
  goal: "Ziel (Punkte)",
  show_completed: "Erledigte anzeigen",
  kid_mode: "Kinder-Modus",
  shopping_lists: "Einkaufslisten (Bring!)",
  shopping_points: "Punkte pro Einkauf",
  bring_deeplink: "Bring!-Link",
  name: "Name",
  person: "Person (Avatar)",
  lists: "Aufgabenlisten (todo.*)",
};
const HELPERS: Record<string, string> = {
  points_per_task: "Punkte je erledigter Aufgabe (Standard 10).",
  goal: "Familien-Punkteziel für den Fortschrittsbalken. 0 = aus.",
  show_completed: "Erledigte Aufgaben ausgegraut mitanzeigen.",
  kid_mode: "Großes, tippbares Layout fürs Kinder-Tablet (Avatar oben zum Wechseln).",
  shopping_lists:
    "Diese todo.*-Listen (z. B. Bring!) werden als eine 'Einkauf'-Kachel gezeigt; Abhaken erledigt den ganzen Einkauf.",
  shopping_points: "Punkte für einen erledigten Einkauf (Standard = Punkte pro Aufgabe).",
  bring_deeplink: "Ziel des 'In Bring! öffnen'-Buttons (Standard web.getbring.com).",
  person: "Optional: person.* liefert Avatarbild & Anzeigename.",
  lists: "Eine oder mehrere todo.*-Listen, die zu dieser Person gehören.",
  goal_person: "Optionales persönliches Punkteziel.",
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

  /** Settings data with shopping_lists normalized to an array for the picker. */
  private get _settingsData(): FamilyTaskConfig {
    const s = this._config.shopping_lists;
    const shopping_lists = Array.isArray(s) ? s : s ? [s] : [];
    return { ...this._config, shopping_lists };
  }

  private _emit(config: FamilyTaskConfig): void {
    this.dispatchEvent(new CustomEvent("config-changed", { detail: { config } }));
  }

  private _label = (s: { name: string }): string => LABELS[s.name] ?? s.name;
  private _helper = (s: { name: string }): string | undefined => HELPERS[s.name];

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
          .schema=${SETTINGS_SCHEMA}
          .computeLabel=${this._label}
          .computeHelper=${this._helper}
          @value-changed=${this._settingsChanged}
        ></ha-form>

        <div class="section">
          <div class="section-head">
            <span>Personen</span>
            <button class="link" @click=${this._autoDetect} title="person.*-Entitäten übernehmen">
              Personen erkennen
            </button>
          </div>

          ${this._persons.map((p, idx) => this._personRow(p, idx))}
          ${
            this._persons.length === 0
              ? html`<div class="empty">Noch keine Person. Füge eine hinzu.</div>`
              : nothing
          }

          <button class="add" @click=${this._addPerson}>+ Person hinzufügen</button>
        </div>
      </div>
    `;
  }

  private _personRow(p: PersonConfig, idx: number) {
    const color = this._personColor(p, idx);
    const title = p.name || p.person || `Person ${idx + 1}`;
    return html`
      <div class="person">
        <div class="person-head">
          <span class="dot" style="background:${color}"></span>
          <span class="ptitle">${title}</span>
          <span class="spacer"></span>
          <ha-icon-button
            .path=${"M7,15L12,10L17,15H7Z"}
            title="Nach oben"
            .disabled=${idx === 0}
            @click=${() => this._movePerson(idx, -1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M7,10L12,15L17,10H7Z"}
            title="Nach unten"
            .disabled=${idx === this._persons.length - 1}
            @click=${() => this._movePerson(idx, 1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}
            title="Entfernen"
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
          <span class="colors-label">Farbe</span>
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
            title="Automatisch (Palette)"
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
