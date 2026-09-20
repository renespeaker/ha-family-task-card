import type { HomeAssistant } from "custom-card-helpers";

/**
 * Tiny localization layer (German default, English fallback). The card is used
 * across families in different languages; strings are picked from the running
 * Home Assistant UI language. Add a key here and reference it via `t(hass, key)`.
 */

export type Lang = "de" | "en";

type Entry = { de: string; en: string };

const STRINGS: Record<string, Entry> = {
  subtitle: { de: "Familien-Aufgaben", en: "Family tasks" },
  open: { de: "offen", en: "open" },
  all_done_board: { de: "Alles erledigt 🎉", en: "All done 🎉" },
  all_done_kid: { de: "Alles geschafft!", en: "All done!" },
  shopping: { de: "Einkauf", en: "Shopping" },
  items: { de: "Artikel", en: "items" },
  open_app: { de: "Öffnen", en: "Open" },
  today: { de: "heute", en: "today" },
  overdue: { de: "Überfällig", en: "Overdue" },
  due_soon: { de: "Bald fällig", en: "Due soon" },
  no_toggle: {
    de: "Diese Liste unterstützt kein Abhaken",
    en: "This list can't be checked off",
  },
  add_task: { de: "Aufgabe hinzufügen…", en: "Add task…" },
  rewards: { de: "Belohnungen", en: "Rewards" },
  balance: { de: "Guthaben", en: "Balance" },
  no_wallet_1: { de: "Kein Guthaben-Helfer (", en: "No points helper (" },
  no_wallet_2: {
    de: ") gesetzt – Einlösen ist deaktiviert.",
    en: ") set — redeeming is disabled.",
  },
  redeem: { de: "Einlösen", en: "Redeem" },
  parent_pin: { de: "Eltern-PIN:", en: "Parent PIN:" },
  cancel: { de: "Abbrechen", en: "Cancel" },
  wrong_pin: { de: "Falsche PIN", en: "Wrong PIN" },
  leaderboard: { de: "🏆 Rangliste", en: "🏆 Leaderboard" },
  level: { de: "Level", en: "Level" },
  to_next: { de: "zum nächsten", en: "to next" },
  goal: { de: "Ziel", en: "Goal" },
  // editor
  persons: { de: "Personen", en: "Persons" },
  detect_persons: { de: "Personen erkennen", en: "Detect persons" },
  detect_persons_hint: {
    de: "person.*-Entitäten übernehmen",
    en: "Import person.* entities",
  },
  no_persons: { de: "Noch keine Person. Füge eine hinzu.", en: "No person yet. Add one." },
  add_person: { de: "+ Person hinzufügen", en: "+ Add person" },
  color: { de: "Farbe", en: "Color" },
  color_auto: { de: "Automatisch (Palette)", en: "Automatic (palette)" },
  move_up: { de: "Nach oben", en: "Move up" },
  move_down: { de: "Nach unten", en: "Move down" },
  remove: { de: "Entfernen", en: "Remove" },
  person_fallback: { de: "Person", en: "Person" },
  sort_manual: { de: "Manuell", en: "Manual" },
  sort_due: { de: "Nach Fälligkeit", en: "By due date" },
  sort_alpha: { de: "Alphabetisch", en: "Alphabetical" },
  theme_auto: { de: "Automatisch (HA-Theme)", en: "Automatic (HA theme)" },
  theme_dark: { de: "Dunkel", en: "Dark" },
  theme_light: { de: "Hell", en: "Light" },
};

export function langOf(hass?: HomeAssistant): Lang {
  const l = (hass?.locale?.language || "de").toLowerCase();
  return l.startsWith("de") ? "de" : "en";
}

export function t(hass: HomeAssistant | undefined, key: string): string {
  const e = STRINGS[key];
  if (!e) return key;
  return e[langOf(hass)] ?? e.de;
}
