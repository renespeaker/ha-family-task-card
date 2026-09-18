import { LitElement, html, css, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant, LovelaceCard, LovelaceCardConfig } from "custom-card-helpers";

/**
 * Family Task Card — a gamified family task / chore card for Home Assistant.
 *
 * Status: early skeleton. This registers the `family-task-card` custom element
 * and renders a theme-aware placeholder. The real UI (per-person columns with
 * avatars, tinted task tiles, points, kid mode, rewards, Bring! shopping) — in
 * the visual language of the Family Board Card — is on the roadmap. See
 * ROADMAP.md.
 */

const CARD_NAME = "Family Task Card";
const REPO = "https://github.com/renespeaker/ha-family-task-card";

export interface FamilyTaskConfig extends LovelaceCardConfig {
  title?: string;
}

export class FamilyTaskCard extends LitElement implements LovelaceCard {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private _config?: FamilyTaskConfig;

  public static getStubConfig(): FamilyTaskConfig {
    return { type: "custom:family-task-card", title: "Familien-Aufgaben" };
  }

  public setConfig(config: FamilyTaskConfig): void {
    this._config = config ?? { type: "custom:family-task-card" };
  }

  public getCardSize(): number {
    return 3;
  }

  protected render() {
    if (!this._config) return nothing;
    const title = this._config.title || CARD_NAME;
    return html`
      <ha-card>
        <div class="head">
          <div class="badge">🧹</div>
          <div>
            <div class="title">${title}</div>
            <div class="sub">Familien-Aufgaben · in Entwicklung</div>
          </div>
        </div>
        <div class="note">
          Diese Karte ist noch im Aufbau. Geplant: Aufgaben pro Person mit Avataren &amp; Punkten,
          Kinder-Modus, Belohnungen und Sync mit Apple&nbsp;Erinnerungen, Todoist, Google&nbsp;Tasks
          &amp; Bring! — im Look der Family&nbsp;Board&nbsp;Card. Fahrplan:
          <a href="${REPO}/blob/main/ROADMAP.md" target="_blank" rel="noopener">ROADMAP</a>.
        </div>
      </ha-card>
    `;
  }

  static styles = css`
    ha-card {
      padding: 20px;
      font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, inherit));
      color: var(--primary-text-color);
    }
    .head {
      display: flex;
      align-items: center;
      gap: 12px;
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
    }
    .sub {
      color: var(--secondary-text-color);
      font-size: 0.9em;
      margin-top: 2px;
    }
    .note {
      margin-top: 16px;
      padding: 12px 14px;
      border-radius: 10px;
      background: var(--secondary-background-color);
      border: 1px solid var(--divider-color);
      color: var(--secondary-text-color);
      font-size: 0.9em;
      line-height: 1.5;
    }
    a {
      color: var(--primary-color);
      text-decoration: none;
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
    "Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!). In development.",
  preview: true,
  documentationURL: REPO,
});
