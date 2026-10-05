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
