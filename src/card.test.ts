// @vitest-environment happy-dom
/* ------------------------------------------------------------------ */
/*  Component tests: the card rendered against a fake Home Assistant.  */
/*  The card reads todo lists over the websocket and writes back with  */
/*  the todo services, so the double records both.                     */
/* ------------------------------------------------------------------ */
import { describe, it, expect, beforeAll, afterEach, vi } from "vitest";
import type { FamilyTaskConfig } from "./ha-family-task-card";

beforeAll(async () => {
  await import("./ha-family-task-card");
});

/** HA TodoListEntityFeature flags. */
const CREATE = 1;
const UPDATE = 4;

const task = (uid: string, summary: string, extra: Record<string, unknown> = {}) => ({
  uid,
  summary,
  status: "needs_action",
  ...extra,
});
const done = (uid: string, summary: string) => task(uid, summary, { status: "completed" });

interface MountOpts {
  /** todo.* entity -> items, plus the features that list supports. */
  lists?: Record<string, { items: unknown[]; features?: number }>;
  lang?: string;
  now?: string;
  /** Extra entity states, e.g. the points sensors of the Family Tasks integration. */
  states?: Record<string, unknown>;
  /** Services HA knows about (hass.services), e.g. { family_tasks: { award: {} } }. */
  services?: Record<string, Record<string, unknown>>;
}

interface ServiceCall {
  domain: string;
  service: string;
  data: Record<string, unknown>;
}

const mounted: HTMLElement[] = [];

async function mount(config: Partial<FamilyTaskConfig>, opts: MountOpts = {}) {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(opts.now ?? "2026-09-21T10:00:00"));
  const lists = opts.lists ?? {};
  const states: Record<string, unknown> = {};
  for (const [entity, list] of Object.entries(lists)) {
    states[entity] = {
      state: String(
        list.items.filter((i) => (i as { status: string }).status !== "completed").length,
      ),
      last_changed: "2026-09-21T06:00:00+00:00",
      attributes: {
        friendly_name: entity.split(".")[1],
        supported_features: list.features ?? CREATE | UPDATE,
      },
    };
  }
  Object.assign(states, opts.states ?? {});
  const services: ServiceCall[] = [];
  const el = document.createElement("family-task-card") as HTMLElement & {
    setConfig(c: unknown): void;
    hass: unknown;
    updateComplete: Promise<unknown>;
  };
  el.setConfig({ type: "custom:family-task-card", persons: [], ...config });
  el.hass = {
    locale: { language: opts.lang ?? "de" },
    states,
    services: opts.services ?? {},
    callWS: async (msg: Record<string, unknown>) => {
      if (msg.type === "todo/item/list") {
        return { items: lists[msg.entity_id as string]?.items ?? [] };
      }
      return {};
    },
    callService: async (domain: string, service: string, data: Record<string, unknown>) => {
      services.push({ domain, service, data });
    },
  };
  document.body.appendChild(el);
  mounted.push(el);
  const settle = async () => {
    for (let i = 0; i < 8; i++) {
      await vi.advanceTimersByTimeAsync(0);
      await el.updateComplete;
    }
  };
  await settle();
  const root = el.shadowRoot as ShadowRoot;
  return {
    el,
    root,
    services,
    settle,
    text: () => (root.textContent ?? "").replace(/\s+/g, " ").trim(),
    all: (sel: string) => [...root.querySelectorAll(sel)],
    texts: (sel: string) =>
      [...root.querySelectorAll(sel)].map((n) => (n.textContent ?? "").replace(/\s+/g, " ").trim()),
  };
}

afterEach(() => {
  mounted.splice(0).forEach((el) => el.remove());
  vi.useRealTimers();
});

describe("configuration", () => {
  it("refuses a config without a persons list", async () => {
    const el = document.createElement("family-task-card") as HTMLElement & {
      setConfig(c: unknown): void;
    };
    expect(() => el.setConfig({ type: "custom:family-task-card" })).toThrow(/persons/);
  });

  it("says so in the browser language, since hass is not there yet", async () => {
    const el = document.createElement("family-task-card") as HTMLElement & {
      setConfig(c: unknown): void;
    };
    const lang = vi.spyOn(navigator, "language", "get").mockReturnValue("en-GB");
    expect(() => el.setConfig({ type: "custom:family-task-card" })).toThrow(
      /must be a list with at least one person/,
    );
    lang.mockReturnValue("de-DE");
    expect(() => el.setConfig({ type: "custom:family-task-card" })).toThrow(/muss eine Liste sein/);
    lang.mockRestore();
  });
});

describe("the board", () => {
  const anna = { name: "Anna", lists: "todo.anna" };

  it("gives every person a column with their open tasks", async () => {
    const { texts } = await mount(
      { persons: [anna, { name: "Ben", lists: "todo.ben" }] },
      {
        lists: {
          "todo.anna": { items: [task("a1", "Müll rausbringen")] },
          "todo.ben": { items: [task("b1", "Wäsche")] },
        },
      },
    );
    expect(texts(".col-head").join(" ")).toContain("Anna");
    expect(texts(".col-head").join(" ")).toContain("Ben");
    expect(texts(".tile-title")).toEqual(["Müll rausbringen", "Wäsche"]);
  });

  it("leaves completed tasks out and counts them as points", async () => {
    const { texts, text } = await mount(
      { persons: [anna], points_per_task: 10 },
      { lists: { "todo.anna": { items: [task("a1", "Offen"), done("a2", "Erledigt")] } } },
    );
    expect(texts(".tile-title")).toEqual(["Offen"]);
    expect(text()).toContain("10"); // one completed task -> 10 points
  });

  it("hides a person without open tasks only when asked to", async () => {
    const lists = { "todo.anna": { items: [done("a1", "Erledigt")] } };
    const shown = await mount({ persons: [anna] }, { lists });
    const hidden = await mount({ persons: [anna], hide_empty: true }, { lists });
    expect(shown.texts(".col-head").join(" ")).toContain("Anna");
    expect(hidden.texts(".col-head").join(" ")).not.toContain("Anna");
  });
});

describe("checking tasks off", () => {
  it("writes the new status back to the source list", async () => {
    const { root, services } = await mount(
      { persons: [{ name: "Anna", lists: "todo.anna" }] },
      { lists: { "todo.anna": { items: [task("a1", "Müll rausbringen")] } } },
    );
    (root.querySelector(".tile") as HTMLElement).click();
    await vi.advanceTimersByTimeAsync(0);
    expect(services).toHaveLength(1);
    expect(services[0]).toMatchObject({
      domain: "todo",
      service: "update_item",
      data: { entity_id: "todo.anna", item: "a1", status: "completed" },
    });
  });

  it("does not offer to check off a read-only list", async () => {
    const { root, services } = await mount(
      { persons: [{ name: "Anna", lists: "todo.anna" }] },
      { lists: { "todo.anna": { items: [task("a1", "Nur lesen")], features: 0 } } },
    );
    const tile = root.querySelector(".tile") as HTMLElement;
    expect(tile.className).toContain("readonly");
    tile.click();
    await vi.advanceTimersByTimeAsync(0);
    expect(services).toHaveLength(0);
  });

  it("offers an add field only for a list that can create items", async () => {
    const creatable = await mount(
      { persons: [{ name: "Anna", lists: "todo.anna" }] },
      { lists: { "todo.anna": { items: [], features: CREATE | UPDATE } } },
    );
    const readOnly = await mount(
      { persons: [{ name: "Anna", lists: "todo.anna" }] },
      { lists: { "todo.anna": { items: [], features: UPDATE } } },
    );
    expect(creatable.all(".add-input")).toHaveLength(1);
    expect(readOnly.all(".add-input")).toHaveLength(0);
  });
});

describe("shopping lists", () => {
  it("collapses a shopping list into one tile with its item count", async () => {
    const { texts, all } = await mount(
      {
        persons: [{ name: "Anna", lists: ["todo.anna", "todo.bring"] }],
        shopping_lists: "todo.bring",
      },
      {
        lists: {
          "todo.anna": { items: [task("a1", "Müll rausbringen")] },
          "todo.bring": { items: [task("b1", "Milch"), task("b2", "Brot")] },
        },
      },
    );
    expect(all(".tile.shopping")).toHaveLength(1);
    // the individual items stay inside the shopping tile, not as own tiles
    expect(texts(".tile-title")).not.toContain("Milch");
    expect(texts(".tile.shopping").join(" ")).toContain("2");
  });
});

describe("due dates", () => {
  it("marks an overdue task", async () => {
    const { all } = await mount(
      { persons: [{ name: "Anna", lists: "todo.anna" }] },
      { lists: { "todo.anna": { items: [task("a1", "Längst fällig", { due: "2026-09-18" })] } } },
    );
    expect(all(".tile.urgent")).toHaveLength(1);
  });

  it("keeps quiet about a task that is still in time", async () => {
    const { all } = await mount(
      { persons: [{ name: "Anna", lists: "todo.anna" }] },
      { lists: { "todo.anna": { items: [task("a1", "Später", { due: "2026-12-24" })] } } },
    );
    expect(all(".tile.urgent")).toHaveLength(0);
  });

  // Microsoft To Do (via MS365-ToDo) sends an all-day due date as a midnight
  // timestamp. "Now" is 21 Sep 10:00 in Berlin (summer time, +02:00).
  const one = (due: string) => ({
    lists: { "todo.anna": { items: [task("a1", "Staubsaugen", { due })] } },
  });
  const anna = { persons: [{ name: "Anna", lists: "todo.anna" }] };

  it("reads a local-midnight timestamp as due today, not overdue", async () => {
    const { all, texts } = await mount(anna, one("2026-09-21T00:00:00+02:00"));
    expect(all(".tile.urgent")).toHaveLength(0);
    expect(texts(".tile-due")).toEqual(["heute"]);
  });

  it("reads a UTC-midnight timestamp as that day, too", async () => {
    const { all, texts } = await mount(anna, one("2026-09-21T00:00:00Z"));
    expect(all(".tile.urgent")).toHaveLength(0);
    expect(texts(".tile-due")).toEqual(["heute"]);
  });

  it("turns such a task overdue the next day", async () => {
    const { all } = await mount(anna, one("2026-09-20T00:00:00+02:00"));
    expect(all(".tile.urgent")).toHaveLength(1);
  });

  it("keeps a real time exact and shows it", async () => {
    const past = await mount(anna, one("2026-09-21T09:00:00+02:00"));
    expect(past.all(".tile.urgent")).toHaveLength(1);
    const later = await mount(anna, one("2026-09-21T18:00:00+02:00"));
    expect(later.all(".tile.urgent")).toHaveLength(0);
    expect(later.texts(".tile-due")).toEqual(["heute, 18:00"]);
  });

  it("counts due-soon in calendar days", async () => {
    const soon = await mount({ ...anna, due_soon: 2 }, one("2026-09-23"));
    expect(soon.text()).toContain("Bald fällig");
    const later = await mount({ ...anna, due_soon: 2 }, one("2026-09-24"));
    expect(later.text()).not.toContain("Bald fällig");
  });

  it("stays right across the switch back to winter time", async () => {
    // 25 Oct 2026 is 25 hours long in Berlin; a day-count must not slip.
    const { all, text } = await mount(
      { ...anna, due_soon: 1 },
      { ...one("2026-10-26T00:00:00+01:00"), now: "2026-10-25T10:00:00" },
    );
    expect(all(".tile.urgent")).toHaveLength(0);
    expect(text()).toContain("Bald fällig");
  });
});

describe("language", () => {
  const person = { name: "Anna", lists: "todo.anna" };

  it("follows the Home Assistant language", async () => {
    const lists = { "todo.anna": { items: [task("a1", "Müll", { due: "2026-09-18" })] } };
    const de = await mount({ persons: [person] }, { lists });
    const en = await mount({ persons: [person] }, { lists, lang: "en" });
    expect(de.text()).toContain("Überfällig");
    expect(en.text()).toContain("Overdue");
    expect(en.text()).not.toContain("Überfällig");
  });

  it("falls back to English for a language we do not ship", async () => {
    const { text } = await mount(
      { persons: [person] },
      { lists: { "todo.anna": { items: [done("a1", "Fertig")] } }, lang: "fr" },
    );
    expect(text()).toContain("All done");
  });
});

describe("kid mode", () => {
  it("switches to the big single-child layout", async () => {
    const { all } = await mount(
      { persons: [{ name: "Mia", lists: "todo.mia" }], kid_mode: true },
      { lists: { "todo.mia": { items: [task("m1", "Zimmer aufräumen")] } } },
    );
    expect(all(".kid")).toHaveLength(1);
    expect(all(".board")).toHaveLength(0);
  });
});

describe("appearance", () => {
  const opts = { lists: { "todo.anna": { items: [task("a1", "Tisch decken")] } } };

  it("leaves the host untouched at the defaults", async () => {
    const { el } = await mount({ persons: [{ name: "Anna", lists: "todo.anna" }] }, opts);
    expect(el.style.getPropertyValue("--ftc-fs")).toBe("1");
    expect(el.style.getPropertyValue("--ftc-av")).toBe("1");
    // zoom stays cleared at 100 % so nothing lingers on the host.
    expect(el.style.getPropertyValue("zoom")).toBe("");
  });

  it("maps scale / font_scale / avatar_scale to host variables", async () => {
    const { el } = await mount(
      {
        persons: [{ name: "Anna", lists: "todo.anna" }],
        scale: 150,
        font_scale: 120,
        avatar_scale: 80,
      },
      opts,
    );
    expect(el.style.getPropertyValue("--ftc-fs")).toBe("1.2");
    expect(el.style.getPropertyValue("--ftc-av")).toBe("0.8");
    expect(el.style.getPropertyValue("zoom")).toBe("1.5");
  });

  it("clamps out-of-range values into a sane band", async () => {
    const { el } = await mount(
      { persons: [{ name: "Anna", lists: "todo.anna" }], scale: 5000, font_scale: 0 },
      opts,
    );
    expect(el.style.getPropertyValue("zoom")).toBe("4"); // 400 % ceiling
    expect(el.style.getPropertyValue("--ftc-fs")).toBe("0.5"); // 50 % floor
  });
});

describe("auto-rotation", () => {
  // Monday 5 Oct 2026 starts a round; that week runs to Sunday 11 Oct.
  const ROT = CREATE | UPDATE | 16; // 16 = SET_DUE_DATE_ON_ITEM
  const kids = [{ name: "Lina" }, { name: "Ben" }];
  const on = { persons: kids, rotation: true, rotation_lists: "todo.aemtli" };
  const chores = (items: unknown[], features = ROT) => ({
    lists: { "todo.aemtli": { items, features } },
  });
  const twoChores = [
    task("c1", "Müll", { due: "2026-10-11" }),
    task("c2", "Spülmaschine", { due: "2026-10-11" }),
  ];
  const columns = (root: ShadowRoot) =>
    [...root.querySelectorAll(".col")].map((c) =>
      [...c.querySelectorAll(".tile-title")].map((n) => (n.textContent ?? "").trim()),
    );
  const writes = (services: ServiceCall[]) =>
    services.filter((s) => s.domain === "todo" && s.service === "update_item");

  it("does nothing while the switch is off", async () => {
    const { root, services } = await mount(
      { ...on, rotation: false },
      { ...chores(twoChores), now: "2026-10-05T10:00:00" },
    );
    expect(columns(root).flat()).toEqual([]);
    expect(services).toEqual([]);
  });

  it("splits the chores and swaps them the next week", async () => {
    const mon = await mount(on, { ...chores(twoChores), now: "2026-10-07T10:00:00" });
    const thisWeek = columns(mon.root);
    expect(thisWeek.map((c) => c.length)).toEqual([1, 1]);
    const next = await mount(on, { ...chores(twoChores), now: "2026-10-12T10:00:00" });
    expect(columns(next.root)).toEqual([thisWeek[1], thisWeek[0]]);
  });

  it("says who is next", async () => {
    const { text } = await mount(on, { ...chores(twoChores), now: "2026-10-07T10:00:00" });
    expect(text()).toContain("🔄 nächste Woche: Lina");
    expect(text()).toContain("🔄 nächste Woche: Ben");
  });

  it("can rotate daily", async () => {
    const daily = { ...on, rotation_period: "day" as const };
    const mon = await mount(daily, { ...chores(twoChores), now: "2026-10-05T10:00:00" });
    const tue = await mount(daily, { ...chores(twoChores), now: "2026-10-06T10:00:00" });
    expect(columns(tue.root)).toEqual([columns(mon.root)[1], columns(mon.root)[0]]);
    expect(tue.text()).toContain("🔄 morgen:");
  });

  it("only rotates among the persons taking part", async () => {
    const { root } = await mount(
      { ...on, persons: [...kids, { name: "Mama" }], rotation_persons: ["Lina", "Ben"] },
      { ...chores(twoChores), now: "2026-10-07T10:00:00" },
    );
    const [lina, ben, mama] = columns(root);
    expect([lina.length, ben.length, mama.length]).toEqual([1, 1, 0]);
  });

  it("reopens last week's chore and moves it into this week", async () => {
    const { services } = await mount(on, {
      ...chores([task("c1", "Müll", { status: "completed", due: "2026-10-04" })]),
      now: "2026-10-05T10:00:00",
    });
    expect(writes(services)).toEqual([
      {
        domain: "todo",
        service: "update_item",
        data: {
          entity_id: "todo.aemtli",
          item: "c1",
          status: "needs_action",
          due_date: "2026-10-11",
        },
      },
    ]);
  });

  it("keeps this week's done chore done and gives no points for it", async () => {
    const { services, texts } = await mount(
      { ...on, persons: [{ name: "Lina" }] },
      {
        ...chores([task("c1", "Müll", { status: "completed", due: "2026-10-11" })]),
        now: "2026-10-07T10:00:00",
      },
    );
    expect(writes(services)).toEqual([]);
    expect(texts(".col-meta").join(" ")).toContain("⭐ 0");
  });

  it("leaves a list alone that cannot hold a due date", async () => {
    const { services } = await mount(on, {
      ...chores([task("c1", "Müll", { status: "completed" })], CREATE | UPDATE),
      now: "2026-10-05T10:00:00",
    });
    expect(writes(services)).toEqual([]);
  });

  it("does not reopen anything when told not to", async () => {
    const { services } = await mount(
      { ...on, rotation_reset: false },
      {
        ...chores([task("c1", "Müll", { status: "completed", due: "2026-10-04" })]),
        now: "2026-10-05T10:00:00",
      },
    );
    expect(writes(services)).toEqual([]);
  });
});

describe("points ledger (Family Tasks integration)", () => {
  const FT = { family_tasks: { award: {}, revoke: {}, redeem: {}, adjust: {} } };
  const lina = { name: "Lina", person: "person.lina", lists: "todo.lina" };
  const sensor = (person: string, balance: number, earned: number, redeemed: number) => ({
    "sensor.lina_points": {
      entity_id: "sensor.lina_points",
      state: String(balance),
      last_changed: "x",
      attributes: { person, earned, redeemed },
    },
  });
  const lists = {
    "todo.lina": { items: [done("a1", "Zimmer"), task("a2", "Müll"), done("a3", "Bett")] },
  };
  const calls = (services: ServiceCall[], name: string) =>
    services.filter((s) => s.domain === "family_tasks" && s.service === name).map((s) => s.data);

  it("stays off unless switched on, even with the integration installed", async () => {
    const { services, texts } = await mount({ persons: [lina] }, { lists, services: FT });
    expect(calls(services, "award")).toEqual([]);
    expect(texts(".col-meta").join(" ")).toContain("⭐ 20"); // live: 2 done × 10
  });

  it("reports every checked-off task once, keyed by list and task", async () => {
    const { services, el, settle } = await mount(
      { persons: [lina], points_backend: true },
      { lists, services: FT },
    );
    (el as unknown as { requestUpdate(): void }).requestUpdate();
    await settle();
    expect(calls(services, "award")).toEqual([
      { key: "todo.lina|a1", person: "person.lina", points: 10, task: "Zimmer" },
      { key: "todo.lina|a3", person: "person.lina", points: 10, task: "Bett" },
    ]);
  });

  it("takes the points from the ledger sensor", async () => {
    const { texts } = await mount(
      { persons: [lina], points_backend: true },
      { lists, services: FT, states: sensor("person.lina", 25, 40, 15) },
    );
    // the ledger knows more than the list (e.g. cleared tasks): 40, not 20
    expect(texts(".col-meta").join(" ")).toContain("💰 25");
  });

  it("falls back to live points when the integration is missing", async () => {
    const { services, texts } = await mount({ persons: [lina], points_backend: true }, { lists });
    expect(services).toEqual([]);
    expect(texts(".col-meta").join(" ")).toContain("⭐ 20");
  });

  it("takes the points back when a task is unchecked in the card", async () => {
    const { services, all, settle } = await mount(
      { persons: [lina], points_backend: true, show_completed: true },
      { lists, services: FT },
    );
    (all(".tile.done")[0] as HTMLElement).click();
    await settle();
    expect(calls(services, "revoke")).toEqual([{ key: "todo.lina|a1" }]);
  });

  it("pays rewards from the ledger", async () => {
    const { services, root, settle } = await mount(
      {
        persons: [lina],
        points_backend: true,
        rewards: [{ name: "Eis", cost: 20, emoji: "🍦" }],
      },
      { lists, services: FT, states: sensor("person.lina", 25, 25, 0) },
    );
    (root.querySelector(".shop-toggle") as HTMLElement).click();
    await settle();
    (root.querySelector(".reward:not([disabled]) button, button.redeem") as HTMLElement).click();
    await settle();
    expect(calls(services, "redeem")).toEqual([
      { person: "person.lina", points: 20, reward: "Eis" },
    ]);
  });

  it("credits a rotating chore once per round to whoever had it", async () => {
    const { services } = await mount(
      {
        persons: [{ name: "Lina" }, { name: "Ben" }],
        points_backend: true,
        rotation: true,
        rotation_lists: "todo.aemtli",
      },
      {
        lists: {
          "todo.aemtli": {
            items: [
              task("c1", "Müll", { status: "completed", due: "2026-10-11" }), // this round
              task("c2", "Spülen", { status: "completed", due: "2026-10-04" }), // last round
            ],
            features: CREATE | UPDATE | 16,
          },
        },
        services: FT,
        now: "2026-10-07T10:00:00",
      },
    );
    const awards = calls(services, "award");
    expect(awards).toHaveLength(1);
    expect(awards[0]).toMatchObject({ key: "todo.aemtli|c1|2026-10-11", points: 10, task: "Müll" });
    expect(["Lina", "Ben"]).toContain(awards[0].person);
  });
});

describe("reward approval by push", () => {
  const FT = {
    family_tasks: { award: {}, revoke: {}, redeem: {}, request_reward: {}, approve: {}, deny: {} },
  };
  const lina = { name: "Lina", person: "person.lina", lists: "todo.lina" };
  const ledger = (pending: unknown[] = [], reserved = 0) => ({
    "sensor.lina_points": {
      entity_id: "sensor.lina_points",
      state: String(50 - reserved),
      last_changed: "x",
      attributes: { person: "person.lina", earned: 50, redeemed: 0, reserved, pending },
    },
  });
  const base = {
    persons: [lina],
    points_backend: true,
    reward_approval: true,
    rewards: [{ name: "Eis", cost: 20, emoji: "🍦" }],
  };
  const opts = (pending: unknown[] = [], reserved = 0) => ({
    lists: { "todo.lina": { items: [] } },
    services: FT,
    states: ledger(pending, reserved),
  });
  const calls = (services: ServiceCall[], name: string) =>
    services.filter((s) => s.domain === "family_tasks" && s.service === name).map((s) => s.data);
  const openShop = async (root: ShadowRoot, settle: () => Promise<void>) => {
    (root.querySelector(".shop-toggle") as HTMLElement).click();
    await settle();
  };

  it("requests the reward instead of redeeming it, without a PIN prompt", async () => {
    const { services, root, settle, text } = await mount({ ...base, parent_pin: "1234" }, opts());
    await openShop(root, settle);
    expect(text()).toContain("Anfragen");
    (root.querySelector(".reward-btn") as HTMLElement).click();
    await settle();
    expect(calls(services, "request_reward")).toEqual([
      { person: "person.lina", points: 20, reward: "Eis" },
    ]);
    expect(calls(services, "redeem")).toEqual([]);
    expect(root.querySelector(".pin")).toBeNull();
  });

  it("shows waiting requests and only the points still free", async () => {
    const { root, settle, text } = await mount(
      base,
      opts([{ id: "r1", reward: "Eis", points: 20 }], 20),
    );
    await openShop(root, settle);
    expect(text()).toContain("wartet auf Freigabe");
    expect(root.querySelector(".shop-balance")!.textContent).toContain("30");
    // without a parent PIN nobody can decide in the card
    expect(root.querySelector(".reward-btn.approve")).toBeNull();
  });

  it("lets a parent decide in the card with the PIN", async () => {
    const { services, root, settle } = await mount(
      { ...base, parent_pin: "1234" },
      opts([{ id: "r1", reward: "Eis", points: 20 }], 20),
    );
    await openShop(root, settle);
    (root.querySelector(".reward-btn.approve") as HTMLElement).click();
    await settle();
    const pin = root.querySelector(".pin-input") as HTMLInputElement;
    pin.value = "0000";
    pin.dispatchEvent(new Event("input"));
    (root.querySelector(".pin-ok") as HTMLElement).click();
    await settle();
    expect(calls(services, "approve")).toEqual([]); // wrong PIN
    pin.value = "1234";
    pin.dispatchEvent(new Event("input"));
    (root.querySelector(".pin-ok") as HTMLElement).click();
    await settle();
    expect(calls(services, "approve")).toEqual([{ request_id: "r1" }]);
  });

  it("can deny with the PIN", async () => {
    const { services, root, settle } = await mount(
      { ...base, parent_pin: "1234" },
      opts([{ id: "r1", reward: "Eis", points: 20 }], 20),
    );
    await openShop(root, settle);
    (root.querySelector(".reward-btn.deny") as HTMLElement).click();
    await settle();
    const pin = root.querySelector(".pin-input") as HTMLInputElement;
    pin.value = "1234";
    pin.dispatchEvent(new Event("input"));
    (root.querySelector(".pin-ok") as HTMLElement).click();
    await settle();
    expect(calls(services, "deny")).toEqual([{ request_id: "r1" }]);
  });

  it("redeems as before while the points ledger is off", async () => {
    const { services, root, settle } = await mount(
      {
        ...base,
        points_backend: false,
        persons: [{ ...lina, points_entity: "input_number.lina" }],
      },
      {
        lists: { "todo.lina": { items: [done("a1", "x"), done("a2", "y")] } },
        services: FT,
        states: {
          "input_number.lina": { entity_id: "input_number.lina", state: "0", attributes: {} },
        },
      },
    );
    await openShop(root, settle);
    (root.querySelector(".reward-btn") as HTMLElement).click();
    await settle();
    expect(calls(services, "request_reward")).toEqual([]);
    expect(services.some((s) => s.domain === "input_number")).toBe(true);
  });
});
