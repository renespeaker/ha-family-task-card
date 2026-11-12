#!/usr/bin/env node
/**
 * Screenshots for the README: renders the built card (family-task-card.js)
 * with sample data in headless Chromium, once in English and once in German.
 *
 *   rm -f family-task-card.js && npm run build
 *   npm i --no-save playwright-core
 *   node tools/make-screenshots.mjs        # -> assets/screenshots/{en,de}/*.png
 *
 * Chromium comes from CHROME_PATH, else the first one found below. Due dates
 * are relative to today, so the pictures always look current.
 */
import { chromium } from "playwright-core";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const BUNDLE = join(ROOT, "family-task-card.js");
const OUT = join(ROOT, "assets", "screenshots");

const CHROME = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium",
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/usr/bin/chromium",
  "/usr/bin/google-chrome",
].find((p) => p && existsSync(p));

/* ---- sample family ------------------------------------------------- */

// Friendly animal avatars instead of photos.
const AVATARS = {
  lina: ["🦊", "#FFE4D6"],
  ben: ["🐼", "#DBEAFE"],
  mom: ["🦉", "#FCE7F3"],
  dad: ["🐻", "#FEF3C7"],
};

// [summary, due in days (null = no date), done?]
const TEXT = {
  en: {
    title: "Our family",
    parents: "Parents",
    momsTasks: "Mom's tasks",
    shopping: "Groceries",
    names: { lina: "Lina", ben: "Ben", mom: "Mom", dad: "Dad" },
    binLabel: "Bins tomorrow!",
    lists: {
      lina: [
        ["Tidy your room", 0],
        ["Homework", 1],
        ["Feed the cat", null, true],
        ["Water the plants", null, true],
        ["Make your bed", null, true],
      ],
      ben: [
        ["Take out the bins", null],
        ["Set the table", 0],
        ["Laundry", null, true],
      ],
      mom: [
        ["Cook dinner", 0],
        ["Do the laundry", 1],
        ["Water the garden", 2],
        ["Book dentist", 9],
        ["Clean the kitchen", null, true],
      ],
      dad: [
        ["Fix the bike", -2],
        ["Clean the windows", 3],
        ["Wash the car", null, true],
      ],
      shopping: [
        ["Milk", null],
        ["Bread", null],
        ["Apples", null],
        ["Coffee", null],
      ],
      chores: [
        ["Do the dishes", "round"],
        ["Walk the dog", "round"],
      ],
      mom_e: [
        ["!File taxes", 1],
        ["Call grandma", 0],
        ["!Renew passport", 21],
        ["Sort photos", null],
        ["Plan summer holiday", null],
      ],
      dad_e: [
        ["Fix the bike", -2],
        ["Take out the bins", null],
        ["!Car insurance", 5],
        ["Clean the windows", 12],
      ],
      long: [
        ["Cancel gym membership", -3],
        ["Call grandma", 0],
        ["Book dentist", 4],
        ["Birthday present for Ben", 6],
        ["Renew passport", 21],
        ["Paint the fence", 40],
        ["Sort photos", null],
        ["Plan summer holiday", null],
        ["Pay the bills", null, true],
        ["Return the parcel", null, true],
      ],
    },
    rewards: [
      { name: "30 min tablet", cost: 50, emoji: "📱" },
      { name: "Ice cream", cost: 30, emoji: "🍦" },
      { name: "Stay up late", cost: 80, emoji: "🌙" },
      { name: "Movie night", cost: 120, emoji: "🎬" },
    ],
  },
  de: {
    title: "Unsere Familie",
    parents: "Eltern",
    momsTasks: "Mamas Aufgaben",
    shopping: "Einkauf",
    names: { lina: "Lina", ben: "Ben", mom: "Mama", dad: "Papa" },
    binLabel: "Morgen Abfuhr!",
    lists: {
      lina: [
        ["Zimmer aufräumen", 0],
        ["Hausaufgaben", 1],
        ["Katze füttern", null, true],
        ["Blumen gießen", null, true],
        ["Bett machen", null, true],
      ],
      ben: [
        ["Müll rausbringen", null],
        ["Tisch decken", 0],
        ["Wäsche aufhängen", null, true],
      ],
      mom: [
        ["Abendessen kochen", 0],
        ["Wäsche waschen", 1],
        ["Garten gießen", 2],
        ["Zahnarzt-Termin", 9],
        ["Küche putzen", null, true],
      ],
      dad: [
        ["Fahrrad reparieren", -2],
        ["Fenster putzen", 3],
        ["Auto waschen", null, true],
      ],
      shopping: [
        ["Milch", null],
        ["Brot", null],
        ["Äpfel", null],
        ["Kaffee", null],
      ],
      chores: [
        ["Geschirr spülen", "round"],
        ["Gassi gehen", "round"],
      ],
      mom_e: [
        ["!Steuer abgeben", 1],
        ["Oma anrufen", 0],
        ["!Reisepass verlängern", 21],
        ["Fotos sortieren", null],
        ["Sommerurlaub planen", null],
      ],
      dad_e: [
        ["Fahrrad reparieren", -2],
        ["Müll rausbringen", null],
        ["!Autoversicherung", 5],
        ["Fenster putzen", 12],
      ],
      long: [
        ["Fitnessstudio kündigen", -3],
        ["Oma anrufen", 0],
        ["Zahnarzt-Termin", 4],
        ["Geburtstagsgeschenk für Ben", 6],
        ["Reisepass verlängern", 21],
        ["Zaun streichen", 40],
        ["Fotos sortieren", null],
        ["Sommerurlaub planen", null],
        ["Rechnungen bezahlen", null, true],
        ["Paket zurückschicken", null, true],
      ],
    },
    rewards: [
      { name: "30 Min. Tablet", cost: 50, emoji: "📱" },
      { name: "Eis", cost: 30, emoji: "🍦" },
      { name: "Länger aufbleiben", cost: 80, emoji: "🌙" },
      { name: "Filmabend", cost: 120, emoji: "🎬" },
    ],
  },
};

// The points ledger (Family Task Card Integration): week points and streaks.
const LEDGER = {
  lina: { earned: 260, redeemed: 50, week_points: 70, month_points: 210, streak: 6 },
  ben: { earned: 180, redeemed: 0, week_points: 50, month_points: 150, streak: 3 },
  mom: { earned: 120, redeemed: 0, week_points: 30, month_points: 90, streak: 0 },
  dad: { earned: 90, redeemed: 0, week_points: 20, month_points: 70, streak: 2 },
};

/* ---- scenes -------------------------------------------------------- */

// The same colour for a person in every picture (palette order of the card).
const COLORS = { lina: "#8B7CF6", ben: "#34D399", mom: "#FBBF24", dad: "#FB7185" };

const who = (t, key, lists) => ({
  name: t.names[key],
  person: `person.${key}`,
  color: COLORS[key],
  lists,
});

function persons(t, keys) {
  const lists = {
    lina: "todo.lina",
    ben: "todo.ben",
    mom: "todo.mom",
    dad: ["todo.dad", "todo.shopping"],
  };
  return keys.map((k) => who(t, k, lists[k]));
}

function binRule(t) {
  return {
    match: "bin|müll",
    entity: "binary_sensor.bin_day_tomorrow",
    state: "on",
    effect: "urgent",
    label: t.binLabel,
  };
}

const rotation = (t) => ({
  rotation: true,
  rotation_lists: "todo.chores",
  rotation_persons: [t.names.lina, t.names.ben],
});

const SCENES = {
  board: {
    width: 1000,
    config: (t) => ({
      title: t.title,
      goal: 1000,
      points_backend: true,
      show_streak: true,
      show_leaderboard: true,
      leaderboard_period: "week",
      shopping_lists: "todo.shopping",
      context_rules: [binRule(t)],
      ...rotation(t),
      persons: persons(t, ["lina", "ben", "mom", "dad"]),
    }),
  },
  kid: {
    width: 560,
    config: (t) => ({
      kid_mode: true,
      points_backend: true,
      show_streak: true,
      reward_approval: true,
      rewards: t.rewards,
      context_rules: [binRule(t)],
      ...rotation(t),
      persons: persons(t, ["lina", "ben"]),
    }),
  },
  rewards: {
    width: 560,
    click: ".kid-shop-btn",
    config: (t) => ({
      kid_mode: true,
      points_backend: true,
      show_streak: true,
      reward_approval: true,
      rewards: t.rewards,
      persons: persons(t, ["lina", "ben"]),
    }),
    pending: true,
  },
  kiosk: {
    width: 760,
    height: 640,
    config: (t) => ({
      kiosk: true,
      points_backend: true,
      shopping_lists: "todo.shopping",
      context_rules: [binRule(t)],
      ...rotation(t),
      persons: persons(t, ["lina", "ben", "mom", "dad"]),
    }),
  },
  eisenhower: {
    width: 860,
    config: (t) => ({
      title: t.parents,
      eisenhower: true,
      context_rules: [binRule(t)],
      persons: [who(t, "mom", "todo.mom_e"), who(t, "dad", "todo.dad_e")],
    }),
  },
  groups: {
    width: 460,
    config: (t) => ({
      title: t.momsTasks,
      group_by_due: true,
      allow_add: false,
      persons: [who(t, "mom", "todo.long")],
    }),
  },
  dark: {
    width: 1000,
    dark: true,
    config: (t) => ({
      ...SCENES.board.config(t),
      theme: "dark",
    }),
  },
};

/* ---- page ---------------------------------------------------------- */

const page = (width, dark) => `<!doctype html><html><head><meta charset="utf-8"><style>
  :root {
    --primary-background-color: ${dark ? "#111318" : "#f2f4f7"};
    --primary-text-color: ${dark ? "#e6e8eb" : "#1c1c1e"};
    --secondary-text-color: ${dark ? "#9aa0a6" : "#6b7280"};
    --card-background-color: ${dark ? "#1c1f26" : "#ffffff"};
    --primary-color: #03a9f4;
    --divider-color: ${dark ? "rgba(255,255,255,.12)" : "rgba(0,0,0,.12)"};
    --ha-card-border-radius: 16px;
    --ha-font-family-body: Inter, Roboto, "Noto Sans", sans-serif;
  }
  html, body { margin: 0; background: var(--primary-background-color); }
  body { font-family: Inter, Roboto, "Noto Sans", sans-serif; -webkit-font-smoothing: antialiased; }
  #shot { width: ${width}px; padding: 20px; box-sizing: content-box; }
</style></head><body><div id="shot"></div></body></html>`;

/** Runs in the page: fake Home Assistant + the card. */
function mount({ config, lang, lists, names, avatars, ledger, pending }) {
  const pad = (n) => String(n).padStart(2, "0");
  const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const day = (offset) => {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + offset);
    return ymd(d);
  };
  // Rotation chores belong to this week's round: due on its Sunday.
  const sunday = 6 - ((new Date().getDay() + 6) % 7);

  const items = {};
  for (const [list, rows] of Object.entries(lists)) {
    items[`todo.${list}`] = rows.map(([summary, due, done], i) => ({
      uid: `${list}-${i}`,
      summary,
      status: done ? "completed" : "needs_action",
      ...(due === null || due === undefined ? {} : { due: day(due === "round" ? sunday : due) }),
    }));
  }

  const states = {};
  for (const [entity, list] of Object.entries(items)) {
    states[entity] = {
      entity_id: entity,
      state: String(list.filter((i) => i.status !== "completed").length),
      last_changed: new Date().toISOString(),
      attributes: {
        friendly_name: names[entity] ?? entity.split(".")[1],
        supported_features: 1 | 2 | 4 | 16,
      },
    };
  }
  for (const [key, [emoji, bg]] of Object.entries(avatars)) {
    // double quotes only: the card puts the picture into url('…')
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120">` +
      `<circle cx="60" cy="60" r="60" fill="${bg}"/>` +
      `<text x="60" y="66" font-size="64" text-anchor="middle" dominant-baseline="middle">${emoji}</text></svg>`;
    states[`person.${key}`] = {
      entity_id: `person.${key}`,
      state: "home",
      attributes: {
        friendly_name: key,
        entity_picture: `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
      },
    };
    const l = ledger[key];
    const waiting = pending && key === "lina";
    states[`sensor.${key}_points`] = {
      entity_id: `sensor.${key}_points`,
      state: String(l.earned - l.redeemed - (waiting ? 30 : 0)),
      attributes: {
        person: `person.${key}`,
        ...l,
        reserved: waiting ? 30 : 0,
        pending: waiting
          ? [
              {
                id: "r1",
                reward: config.rewards?.[1]?.name ?? "",
                points: 30,
                at: new Date().toISOString(),
              },
            ]
          : [],
      },
    };
  }
  states["binary_sensor.bin_day_tomorrow"] = {
    entity_id: "binary_sensor.bin_day_tomorrow",
    state: "on",
    attributes: {},
  };

  const service = {};
  const hass = {
    locale: { language: lang },
    language: lang,
    states,
    services: {
      family_tasks: {
        award: service,
        revoke: service,
        redeem: service,
        adjust: service,
        request_reward: service,
        approve: service,
        deny: service,
      },
    },
    callWS: async (msg) => ({ items: items[msg.entity_id] ?? [] }),
    callService: async () => {},
  };
  const el = document.createElement("family-task-card");
  el.setConfig({ type: "custom:family-task-card", ...config });
  el.hass = hass;
  document.getElementById("shot").appendChild(el);
}

/* ---- run ----------------------------------------------------------- */

if (!existsSync(BUNDLE)) throw new Error("family-task-card.js missing – run `npm run build` first");
if (!CHROME) throw new Error("No Chromium found – set CHROME_PATH");

const browser = await chromium.launch({ executablePath: CHROME });
const only = process.argv.slice(2);
for (const lang of ["en", "de"]) {
  const t = TEXT[lang];
  mkdirSync(join(OUT, lang), { recursive: true });
  for (const [name, scene] of Object.entries(SCENES)) {
    if (only.length && !only.includes(name)) continue;
    const ctx = await browser.newContext({
      viewport: { width: scene.width + 40, height: scene.height ?? 900 },
      deviceScaleFactor: 2,
      locale: lang === "de" ? "de-DE" : "en-GB",
      timezoneId: "Europe/Berlin",
    });
    const tab = await ctx.newPage();
    await tab.setContent(page(scene.width, scene.dark));
    // Home Assistant's <ha-card> is a block; outside HA it would be inline.
    await tab.evaluate(() =>
      customElements.define(
        "ha-card",
        class extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: "open" }).innerHTML =
              "<style>:host{display:block}</style><slot></slot>";
          }
        },
      ),
    );
    await tab.addScriptTag({ path: BUNDLE, type: "module" });
    await tab.waitForFunction(() => customElements.get("family-task-card"));
    await tab.evaluate(mount, {
      config: scene.config(t),
      lang,
      lists: t.lists,
      names: { "todo.shopping": t.shopping },
      avatars: AVATARS,
      ledger: LEDGER,
      pending: !!scene.pending,
    });
    await tab.waitForTimeout(600);
    if (scene.click) {
      await tab.locator(scene.click).first().click();
      await tab.waitForTimeout(400);
    }
    await tab.evaluate(() => document.fonts.ready);
    const file = join(OUT, lang, `${name}.png`);
    await tab.locator("#shot").screenshot({ path: file });
    console.log("wrote", file.replace(ROOT + "/", ""));
    await ctx.close();
  }
}
await browser.close();
