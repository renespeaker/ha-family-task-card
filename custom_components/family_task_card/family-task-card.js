/**
 * Family Task Card — a gamified family task / chore card for Home Assistant.
 *
 * Status: early skeleton. This file registers the `family-task-card` custom
 * element and renders a theme-aware placeholder. The real UI (per-person
 * columns with avatars, tinted task tiles, points, kid mode, rewards, Bring!
 * shopping) — in the visual language of the Family Board Card — is on the
 * roadmap. See ROADMAP.md.
 */
(function () {
  "use strict";

  const CARD_NAME = "Family Task Card";
  const REPO = "https://github.com/renespeaker/ha-news-card";

  class FamilyTaskCard extends HTMLElement {
    static getStubConfig() {
      return { title: "Familien-Aufgaben" };
    }

    setConfig(config) {
      this._config = config || {};
      this._render();
    }

    set hass(hass) {
      this._hass = hass;
      this._render();
    }

    getCardSize() {
      return 3;
    }

    _render() {
      if (!this._config) return;
      if (!this.shadowRoot) this.attachShadow({ mode: "open" });
      const title = this._config.title || CARD_NAME;
      this.shadowRoot.innerHTML = `
        <style>
          ha-card {
            padding: 20px;
            font-family: var(--ha-font-family-body, var(--mdc-typography-font-family, inherit));
            color: var(--primary-text-color);
          }
          .head { display: flex; align-items: center; gap: 12px; }
          .badge {
            width: 42px; height: 42px; border-radius: 12px; flex: none;
            display: flex; align-items: center; justify-content: center;
            font-size: 22px;
            background: color-mix(in srgb, var(--primary-color) 14%, var(--card-background-color, #fff));
          }
          .title { font-size: 1.2em; font-weight: 700; }
          .sub { color: var(--secondary-text-color); font-size: 0.9em; margin-top: 2px; }
          .note {
            margin-top: 16px; padding: 12px 14px; border-radius: 10px;
            background: var(--secondary-background-color);
            border: 1px solid var(--divider-color);
            color: var(--secondary-text-color); font-size: 0.9em; line-height: 1.5;
          }
          a { color: var(--primary-color); text-decoration: none; }
        </style>
        <ha-card>
          <div class="head">
            <div class="badge">🧹</div>
            <div>
              <div class="title">${escapeHtml(title)}</div>
              <div class="sub">Familien-Aufgaben · in Entwicklung</div>
            </div>
          </div>
          <div class="note">
            Diese Karte ist noch im Aufbau. Geplant: Aufgaben pro Person mit
            Avataren &amp; Punkten, Kinder-Modus, Belohnungen und Sync mit
            Apple&nbsp;Erinnerungen, Todoist, Google&nbsp;Tasks &amp; Bring! —
            im Look der Family&nbsp;Board&nbsp;Card. Fahrplan:
            <a href="${REPO}/blob/main/ROADMAP.md" target="_blank" rel="noopener">ROADMAP</a>.
          </div>
        </ha-card>`;
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  customElements.define("family-task-card", FamilyTaskCard);
  window.customCards = window.customCards || [];
  window.customCards.push({
    type: "family-task-card",
    name: CARD_NAME,
    description:
      "Gamified family task / chore card for Home Assistant — per-person tasks, points, kid mode and rewards, provider-agnostic via todo entities (Apple Reminders, Todoist, Google Tasks, Bring!). In development.",
    preview: true,
    documentationURL: REPO,
  });
})();
