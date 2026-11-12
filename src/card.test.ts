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
  /** Extra entity states, e.g. the points sensors of the Family Task Card Integration. */
  states?: Record<string, unknown>;
  /** Services HA knows about (hass.services), e.g. { family_tasks: { award: {} } }. */
  services?: Record<string, Record<string, unknown>>;
}

interface ServiceCall {
  domain: string;
  service: string;
  data: Record<string, unknown>;
  target?: Record<string, unknown>;
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
    callService: async (
      domain: string,
      service: string,
      data: Record<string, unknown>,
      target?: Record<string, unknown>,
    ) => {
      services.push({ domain, service, data, ...(target ? { target } : {}) });
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

type Hass = {
  states: Record<string, Record<string, unknown>>;
  callWS: (msg: { entity_id: string }) => Promise<unknown>;
  callService: (...args: any[]) => Promise<unknown>;
};
/** The next hass object from HA, with some lists changed. */
const update = (
  el: { hass: unknown },
  change: Record<string, Record<string, unknown>>,
  extra: Partial<Hass> = {},
) => {
  const h = el.hass as Hass;
  const states = { ...h.states };
  for (const [e, c] of Object.entries(change)) states[e] = { ...states[e], ...c };
  el.hass = { ...h, states, ...extra };
};
/** A websocket whose answers wait until released, like a slow connection. */
const slow = (lists: Record<string, unknown[]>) => {
  const waiting: Array<() => void> = [];
  const callWS = (msg: { entity_id: string }) =>
    new Promise((resolve) => waiting.push(() => resolve({ items: lists[msg.entity_id] })));
  return { callWS, answer: () => waiting.splice(0).forEach((a) => a()) };
};

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

describe("loading the lists", () => {
  const anna = { name: "Anna", lists: "todo.anna" };
  const celebrate = { on: "all_done" as const, actions: [{ service: "light.turn_on" }] };
  const lights = (services: ServiceCall[]) => services.filter((s) => s.domain === "light");
  it.each(["unavailable", "unknown"])(
    "keeps the tasks while a list is %s, e.g. while HA restarts",
    async (state) => {
      const { el, services, settle, texts } = await mount(
        { persons: [anna], celebrate },
        { lists: { "todo.anna": { items: [task("a1", "Müll")] } } },
      );
      // HA lists nothing for a list that is not ready yet
      update(
        el,
        { "todo.anna": { state, last_changed: "restart" } },
        { callWS: async () => ({ items: [] }) },
      );
      await settle();
      expect(texts(".tile-title")).toEqual(["Müll"]);
      expect(lights(services)).toEqual([]); // nothing was done, nothing to celebrate
    },
  );

  it("keeps the tasks when a list fails to load and tries again later", async () => {
    const { el, services, settle, texts } = await mount(
      { persons: [anna], celebrate },
      { lists: { "todo.anna": { items: [task("a1", "Müll")] } } },
    );
    let fail = true;
    const callWS = async () => {
      if (fail) throw new Error("timeout");
      return { items: [task("a1", "Müll"), task("a2", "Bett")] };
    };
    update(el, { "todo.anna": { state: "2", last_changed: "later" } }, { callWS });
    await settle();
    expect(texts(".tile-title")).toEqual(["Müll"]);
    expect(lights(services)).toEqual([]);

    fail = false;
    await vi.advanceTimersByTimeAsync(10_000);
    update(el, {}); // the next update from HA, whatever changed
    await settle();
    expect(texts(".tile-title")).toEqual(["Müll", "Bett"]);
  });

  it("does not undo a task checked off while another list loads", async () => {
    const { el, root, services, settle, texts } = await mount(
      { persons: [{ name: "Anna", lists: ["todo.a", "todo.b"] }], celebrate },
      { lists: { "todo.a": { items: [task("a1", "Müll")] }, "todo.b": { items: [] } } },
    );
    const ws = slow({ "todo.a": [done("a1", "Müll")], "todo.b": [] });
    update(el, { "todo.b": { last_changed: "later" } }, { callWS: ws.callWS });
    await settle();
    (root.querySelector(".tile") as HTMLElement).click(); // her last task
    await settle();
    ws.answer(); // todo.b arrives
    await settle();
    expect(texts(".tile-title")).toEqual([]);

    // HA confirms the check
    update(el, { "todo.a": { state: "0", last_changed: "checked" } });
    await settle();
    ws.answer();
    await settle();
    expect(texts(".tile-title")).toEqual([]);
    expect(lights(services)).toHaveLength(1); // celebrated once, not twice
  });

  it("does not undo a check while the same list reloads", async () => {
    // Anna checks off two tasks quickly; the list reloads after the first one
    const { el, all, services, settle, texts } = await mount(
      { persons: [anna], celebrate },
      { lists: { "todo.anna": { items: [task("a1", "Müll"), task("a2", "Bett")] } } },
    );
    const ws = slow({ "todo.anna": [done("a1", "Müll"), task("a2", "Bett")] });
    const writes: Array<() => void> = [];
    const callService = (domain: string, service: string, data: Record<string, unknown>) => {
      services.push({ domain, service, data });
      return domain === "todo" ? new Promise<void>((r) => writes.push(r)) : Promise.resolve();
    };
    update(el, {}, { callWS: ws.callWS, callService });
    await settle();
    (all(".tile")[0] as HTMLElement).click(); // Müll
    await settle();
    writes.splice(0).forEach((w) => w()); // HA has it ...
    update(el, { "todo.anna": { state: "1", last_changed: "first" } }); // ... and reloads
    await settle();
    (all(".tile")[0] as HTMLElement).click(); // Bett, before the reload is back
    await settle();
    ws.answer(); // the reload still has Bett open: HA is not done with it yet
    await settle();
    expect(texts(".tile-title")).toEqual([]);
    expect(lights(services)).toHaveLength(1);
  });

  it("shows a task reopened in another app after it was checked here", async () => {
    const { el, root, settle, texts } = await mount(
      { persons: [anna] },
      { lists: { "todo.anna": { items: [task("a1", "Müll")] } } },
    );
    (root.querySelector(".tile") as HTMLElement).click();
    await settle();
    expect(texts(".tile-title")).toEqual([]);
    update(
      el,
      { "todo.anna": { state: "1", last_changed: "reopened" } },
      { callWS: async () => ({ items: [task("a1", "Müll")] }) },
    );
    await settle();
    expect(texts(".tile-title")).toEqual(["Müll"]);
  });

  it("does not miss a change that comes in while loading", async () => {
    const { el, settle, texts } = await mount(
      { persons: [{ name: "Anna", lists: ["todo.a", "todo.b"] }] },
      { lists: { "todo.a": { items: [task("a1", "Müll")] }, "todo.b": { items: [] } } },
    );
    const ws = slow({ "todo.a": [task("a1", "Müll"), task("a2", "Neu")], "todo.b": [] });
    update(el, { "todo.b": { last_changed: "later" } }, { callWS: ws.callWS });
    await settle();
    // a task is added in another app while todo.b is still loading
    update(el, { "todo.a": { state: "2", last_changed: "added" } });
    await settle();
    for (let i = 0; i < 3; i++) {
      ws.answer();
      await settle();
    }
    expect(texts(".tile-title")).toEqual(["Müll", "Neu"]);
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

describe("card header", () => {
  it("does not repeat the title as subtitle", async () => {
    // "Familien-Aufgaben" is also what the editor suggests as title
    const same = await mount({ title: "Familien-Aufgaben", persons: [] });
    expect(same.all(".sub")).toHaveLength(0);
    const own = await mount({ title: "Haushalt", persons: [] });
    expect(own.texts(".sub")).toEqual(["Familien-Aufgaben"]);
  });
});

describe("shopping trip in a narrow column", () => {
  it("can shrink the Bring! button to an icon and still names it", async () => {
    const { root } = await mount(
      { persons: [{ name: "Papa", lists: "todo.bring" }], shopping_lists: "todo.bring" },
      { lists: { "todo.bring": { items: [task("b1", "Milch")] } }, lang: "en" },
    );
    const link = root.querySelector(".tile.shopping .bring-open")!;
    expect(link.getAttribute("aria-label")).toBe("Open in Bring!");
    expect(link.querySelector(".bo-text")!.textContent).toBe("Open");
    expect(link.querySelector(".bo-icon")!.textContent).toBe("↗");
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

  it("speaks English in kid mode and on shopping trips, too", async () => {
    const lists = {
      "todo.lina": { items: [task("l1", "Zimmer"), task("l2", "Bett")] },
      "todo.bring": { items: [task("b1", "Milch"), task("b2", "Brot")] },
    };
    const config = {
      persons: [{ name: "Lina", lists: ["todo.lina", "todo.bring"] }],
      shopping_lists: "todo.bring",
      rewards: [{ name: "Eis", cost: 10 }],
    };
    const kid = await mount({ ...config, kid_mode: true }, { lists, lang: "en" });
    expect(kid.text()).toContain("3 open");
    expect(kid.text()).toContain("2 items");
    expect(kid.text()).not.toMatch(/offen|Artikel|Öffnen/);
    expect(kid.root.querySelector(".kid-shop-btn")!.getAttribute("title")).toBe("Rewards");
    const board = await mount(config, { lists, lang: "en" });
    expect(board.root.querySelector(".bring-open")!.getAttribute("title")).toBe("Open in Bring!");
  });

  it("suggests a title in the Home Assistant language", async () => {
    const Card = customElements.get("family-task-card") as unknown as {
      getStubConfig(hass?: unknown): { title?: string };
    };
    const hass = (language: string) => ({ locale: { language }, states: {} });
    expect(Card.getStubConfig(hass("en")).title).toBe("Family tasks");
    expect(Card.getStubConfig(hass("de")).title).toBe("Familien-Aufgaben");
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

describe("context rules", () => {
  it("find plain text in the title, also with characters a pattern chokes on", async () => {
    const hide = (match: string) => ({
      match,
      entity: "input_boolean.x",
      state: "on",
      effect: "hide",
    });
    const { texts } = await mount(
      {
        persons: [{ name: "Anna", lists: "todo.anna" }],
        context_rules: [hide("C++"), hide("müll (bio"), hide("gieß|blumen")] as any,
      },
      {
        lists: {
          "todo.anna": {
            items: [
              task("1", "C++ üben"),
              task("2", "Müll (Bio) raus"),
              task("3", "Blumen gießen"),
              task("4", "Lesen"),
            ],
          },
        },
        states: { "input_boolean.x": { state: "on" } },
      },
    );
    expect(texts(".tile-title")).toEqual(["Lesen"]);
  });
});

describe("kiosk mode", () => {
  const kids = [
    { name: "Lina", lists: "todo.lina" },
    { name: "Ben", lists: "todo.ben" },
  ];
  const lists = {
    lists: {
      "todo.lina": { items: [task("l1", "Zimmer")] },
      "todo.ben": { items: [task("b1", "Bett")] },
    },
  };
  const picker = (root: ShadowRoot) => !!root.querySelector(".kiosk-idle");

  it("goes back to 'who's there?' after the idle time", async () => {
    const { root, all, settle } = await mount({ persons: kids, kiosk: true }, lists);
    (all(".kiosk-person")[1] as HTMLElement).click();
    await settle();
    expect(picker(root)).toBe(false);
    await vi.advanceTimersByTimeAsync(30_000);
    await settle();
    expect(picker(root)).toBe(true);
  });

  it("stays with the person when auto_return is 0", async () => {
    const { root, all, settle } = await mount(
      { persons: kids, kiosk: true, auto_return: 0 },
      lists,
    );
    (all(".kiosk-person")[0] as HTMLElement).click();
    await settle();
    await vi.advanceTimersByTimeAsync(10 * 60_000);
    await settle();
    expect(picker(root)).toBe(false);
  });

  it("still goes back after the dashboard view was switched away and back", async () => {
    const { el, root, all, settle } = await mount({ persons: kids, kiosk: true }, lists);
    (all(".kiosk-person")[0] as HTMLElement).click();
    await settle();
    el.remove(); // another dashboard view ...
    document.body.appendChild(el); // ... and back
    await settle();
    await vi.advanceTimersByTimeAsync(30_000);
    await settle();
    expect(picker(root)).toBe(true);
  });

  it("does not leave the star burst on screen when switched away mid-way", async () => {
    const { el, root, all, settle } = await mount({ persons: kids, kid_mode: true }, lists);
    (all(".kid-task")[0] as HTMLElement).click();
    await settle();
    expect(root.querySelector(".burst")).not.toBeNull();
    el.remove();
    document.body.appendChild(el);
    await vi.advanceTimersByTimeAsync(2000);
    await settle();
    expect(root.querySelector(".burst")).toBeNull();
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

  it("leaves the chores alone while their list is unavailable", async () => {
    const { el, services, settle } = await mount(on, {
      ...chores(twoChores),
      now: "2026-10-11T23:58:00",
    });
    await vi.advanceTimersByTimeAsync(5 * 60_000); // a new week starts ...
    const h = el.hass as { states: Record<string, Record<string, unknown>> };
    const aemtli = { ...h.states["todo.aemtli"], state: "unavailable", last_changed: "restart" };
    el.hass = { ...h, states: { ...h.states, "todo.aemtli": aemtli } }; // ... while HA restarts
    await settle();
    expect(writes(services)).toEqual([]);
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

describe("points ledger (Family Task Card Integration)", () => {
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

describe("statistics (points ledger)", () => {
  const FT = { family_tasks: { award: {}, revoke: {}, redeem: {} } };
  const lina = { name: "Lina", person: "person.lina", lists: "todo.lina" };
  const ben = { name: "Ben", person: "person.ben", lists: "todo.ben" };
  const sensor = (who: string, earned: number, week: number, month: number, streak: number) => ({
    [`sensor.${who}_points`]: {
      entity_id: `sensor.${who}_points`,
      state: String(earned),
      last_changed: "x",
      attributes: {
        person: `person.${who}`,
        earned,
        redeemed: 0,
        reserved: 0,
        pending: [],
        week_points: week,
        month_points: month,
        streak,
      },
    },
  });
  // Lina leads all-time, Ben leads this week
  const opts = {
    lists: { "todo.lina": { items: [] }, "todo.ben": { items: [] } },
    services: FT,
    states: { ...sensor("lina", 200, 10, 60, 5), ...sensor("ben", 80, 40, 50, 1) },
  };
  const board = { persons: [lina, ben], points_backend: true, show_leaderboard: true };
  const rows = (texts: (sel: string) => string[]) => texts(".lb-row");

  it("ranks all-time by default", async () => {
    const { texts } = await mount(board, opts);
    expect(rows(texts)[0]).toContain("Lina");
    expect(rows(texts)[0]).toContain("200");
  });

  it("ranks by this week's points", async () => {
    const { texts } = await mount({ ...board, leaderboard_period: "week" }, opts);
    expect(texts(".lb-title")[0]).toContain("diese Woche");
    expect(rows(texts)[0]).toContain("Ben");
    expect(rows(texts)[0]).toContain("40");
  });

  it("ranks by this month's points", async () => {
    const { texts } = await mount({ ...board, leaderboard_period: "month" }, opts);
    expect(rows(texts)[0]).toContain("Lina");
    expect(rows(texts)[0]).toContain("60");
  });

  it("falls back to all-time without the points ledger", async () => {
    const { texts } = await mount(
      { ...board, points_backend: false, leaderboard_period: "week" },
      opts,
    );
    expect(texts(".lb-title")[0]).not.toContain("Woche");
  });

  it("shows a streak only when switched on, from two days on", async () => {
    const off = await mount(board, opts);
    expect(off.all(".streak")).toHaveLength(0);
    const on = await mount({ ...board, show_streak: true }, opts);
    expect(on.texts(".streak")).toEqual(["⚡ 5"]); // Ben's single day earns no flame
  });

  it("shows the streak big in kid mode", async () => {
    const { texts } = await mount(
      { persons: [lina], points_backend: true, show_streak: true, kid_mode: true },
      opts,
    );
    expect(texts(".kid-name .streak")).toEqual(["⚡ 5"]);
  });
});

describe("due-date filters and groups", () => {
  // "now" is Monday 21 Sep 2026, 10:00
  const items = [
    task("o", "Überfällig", { due: "2026-09-18" }),
    task("t", "Heute", { due: "2026-09-21" }),
    task("s", "Bald", { due: "2026-09-25" }),
    task("l", "Später", { due: "2026-10-15" }),
    task("u", "Ohne Termin"),
  ];
  const one = { lists: { "todo.a": { items } } };
  const anna = (extra = {}) => ({ persons: [{ name: "Anna", lists: "todo.a" }], ...extra });
  const titles = (texts: (sel: string) => string[]) => texts(".tile-title");

  it("shows everything, ungrouped, by default", async () => {
    const { texts, all } = await mount(anna(), one);
    expect(titles(texts)).toHaveLength(5);
    expect(all(".grp-head")).toHaveLength(0);
  });

  it("hides tasks without a date", async () => {
    const { texts } = await mount(anna({ hide_undated: true }), one);
    expect(titles(texts)).not.toContain("Ohne Termin");
    expect(titles(texts)).toHaveLength(4);
  });

  it("shows only what is due within N days, overdue always", async () => {
    const { texts } = await mount(anna({ show_within: 7 }), one);
    expect(titles(texts).sort()).toEqual(["Bald", "Heute", "Ohne Termin", "Überfällig"]);
  });

  it("shows only today and overdue with 0", async () => {
    const { texts } = await mount(anna({ show_within: 0, hide_undated: true }), one);
    expect(titles(texts).sort()).toEqual(["Heute", "Überfällig"]);
  });

  it("lets a list override the card", async () => {
    const { texts } = await mount(
      {
        persons: [
          {
            name: "Anna",
            lists: ["todo.a", { entity: "todo.b", hide_undated: true, show_within: 0 }],
          },
        ],
        show_within: 30,
      },
      {
        lists: {
          "todo.a": {
            items: [task("a1", "A ohne"), task("a2", "A Oktober", { due: "2026-10-15" })],
          },
          "todo.b": {
            items: [task("b1", "B ohne"), task("b2", "B Freitag", { due: "2026-09-25" })],
          },
        },
      },
    );
    // todo.a follows the card (30 days, undated shown); todo.b only today
    expect(titles(texts).sort()).toEqual(["A Oktober", "A ohne"]);
  });

  it("shows every task of a list with -1, even when the card limits", async () => {
    const { texts } = await mount(
      {
        persons: [{ name: "Anna", lists: [{ entity: "todo.a", show_within: -1 }] }],
        show_within: 0,
      },
      one,
    );
    expect(titles(texts)).toHaveLength(5);
  });

  it("keeps points for hidden tasks", async () => {
    const { texts } = await mount(anna({ hide_undated: true }), {
      lists: { "todo.a": { items: [done("d1", "Erledigt"), task("u1", "Ohne Termin")] } },
    });
    expect(texts(".col-meta").join(" ")).toContain("⭐ 10");
  });

  it("does not filter rotating chores", async () => {
    const { texts } = await mount(
      {
        persons: [{ name: "Anna" }],
        rotation: true,
        rotation_lists: "todo.aemtli",
        show_within: 0,
        hide_undated: true,
      },
      {
        lists: {
          "todo.aemtli": {
            items: [task("c1", "Müll", { due: "2026-09-27" })],
            features: CREATE | UPDATE | 16,
          },
        },
      },
    );
    expect(titles(texts)).toEqual(["Müll"]);
  });

  it("groups by due date, later and undated collapsed", async () => {
    const { texts, all, root, settle } = await mount(anna({ group_by_due: true }), one);
    expect(texts(".grp-head")).toEqual([
      "🔴 Überfällig 1",
      "📌 Heute 1",
      "📅 Bald 1",
      "🗓 Später 1 ▸",
      "📥 Ohne Termin 1 ▸",
    ]);
    expect(titles(texts)).toEqual(["Überfällig", "Heute", "Bald"]);
    (root.querySelector(".grp-head.undated") as HTMLElement).click();
    await settle();
    expect(titles(texts)).toEqual(["Überfällig", "Heute", "Bald", "Ohne Termin"]);
    expect(all(".grp-head.undated")[0].getAttribute("aria-expanded")).toBe("true");
  });

  it("does not group in kid mode, but filters", async () => {
    const { all, texts } = await mount(
      anna({ group_by_due: true, hide_undated: true, kid_mode: true }),
      one,
    );
    expect(all(".grp-head")).toHaveLength(0);
    expect(texts(".kid-task-title").join(" ")).not.toContain("Ohne Termin");
  });
});

describe("editor", () => {
  it("keeps per-list settings when the lists are edited", async () => {
    await import("./editor"); // the card loads its editor on demand
    const ed = document.createElement("family-task-card-editor") as HTMLElement & {
      setConfig(c: unknown): void;
      hass: unknown;
    };
    ed.hass = { locale: { language: "de" }, states: {} };
    const filtered = { entity: "todo.b", hide_undated: true };
    ed.setConfig({
      type: "custom:family-task-card",
      persons: [{ name: "Anna", lists: ["todo.a", filtered] }],
    });
    let emitted: { persons: { lists: unknown }[] } | undefined;
    ed.addEventListener("config-changed", (e) => (emitted = (e as CustomEvent).detail.config));
    // the picker hands back plain entity ids; add todo.c, keep a and b
    (ed as unknown as { _personChanged(i: number, e: CustomEvent): void })._personChanged(
      0,
      new CustomEvent("value-changed", {
        detail: { value: { name: "Anna", lists: ["todo.a", "todo.b", "todo.c"] } },
      }),
    );
    expect(emitted!.persons[0].lists).toEqual(["todo.a", filtered, "todo.c"]);
  });
});

describe("Eisenhower view", () => {
  // "now" is Monday 21 Sep 2026; urgent = overdue or due within 2 days (by 23 Sep)
  const opts = {
    lists: {
      "todo.mama": {
        items: [
          task("1", "!Steuer abgeben", { due: "2026-09-22" }),
          task("2", "!Urlaub planen", { due: "2026-10-30" }),
          task("3", "Müll rausbringen", { due: "2026-09-21" }),
          task("4", "Fotos sortieren"),
        ],
      },
      "todo.arzt": { items: [task("5", "Zahnarzt", { due: "2026-10-10" })] },
    },
  };
  const persons = [
    { name: "Mama", lists: ["todo.mama", { entity: "todo.arzt", important: true }] },
  ];
  const quad = (root: ShadowRoot, q: string) =>
    [...root.querySelectorAll(`.quad.${q} .tile-title`)].map((n) => n.textContent!.trim());

  it("sorts every open task into urgent × important", async () => {
    const { root } = await mount({ persons, eisenhower: true }, opts);
    expect(quad(root, "do")).toEqual(["Steuer abgeben"]);
    expect(quad(root, "plan")).toEqual(["Zahnarzt", "Urlaub planen"]); // list marked important
    expect(quad(root, "delegate")).toEqual(["Müll rausbringen"]);
    expect(quad(root, "later")).toEqual(["Fotos sortieren"]);
  });

  it("names the person on every tile and drops the '!'", async () => {
    const { root } = await mount({ persons, eisenhower: true }, opts);
    const tile = root.querySelector(".quad.do .tile")!;
    expect(tile.querySelector(".tile-title")!.textContent!.trim()).toBe("Steuer abgeben");
    expect(tile.querySelector(".tile-due")!.textContent).toContain("Mama");
  });

  it("can count only today and overdue as urgent", async () => {
    const { root } = await mount({ persons, eisenhower: true, urgent_within: 0 }, opts);
    expect(quad(root, "do")).toEqual([]);
    expect(quad(root, "plan")).toContain("Steuer abgeben");
  });

  it("checks a task off from the grid", async () => {
    const { root, services, settle } = await mount({ persons, eisenhower: true }, opts);
    (root.querySelector(".quad.delegate .tile") as HTMLElement).click();
    await settle();
    expect(services).toContainEqual({
      domain: "todo",
      service: "update_item",
      data: { entity_id: "todo.mama", item: "3", status: "completed" },
    });
  });

  it("keeps the filters", async () => {
    const { root } = await mount({ persons, eisenhower: true, hide_undated: true }, opts);
    expect(quad(root, "later")).toEqual([]);
  });

  it("leaves the board and kid mode alone", async () => {
    const board = await mount({ persons }, opts);
    expect(board.all(".quad")).toHaveLength(0);
    expect(board.texts(".tile-title")).toContain("!Steuer abgeben");
    const kid = await mount({ persons, eisenhower: true, kid_mode: true }, opts);
    expect(kid.all(".quad")).toHaveLength(0);
    expect(kid.all(".kid")).toHaveLength(1);
  });
});

describe("Eisenhower view: the urgency boundary", () => {
  it("counts a task due in exactly urgent_within days as urgent, one day later not", async () => {
    const { root } = await mount(
      { persons: [{ name: "Mama", lists: "todo.mama" }], eisenhower: true },
      {
        lists: {
          "todo.mama": {
            items: [
              task("a", "Mittwoch", { due: "2026-09-23" }), // in 2 days
              task("b", "Donnerstag", { due: "2026-09-24" }), // in 3 days
            ],
          },
        },
      },
    );
    const titles = (q: string) =>
      [...root.querySelectorAll(`.quad.${q} .tile-title`)].map((n) => n.textContent!.trim());
    expect(titles("delegate")).toEqual(["Mittwoch"]);
    expect(titles("later")).toEqual(["Donnerstag"]);
  });
});

describe("Eisenhower view: rules and shared lists", () => {
  const quad = (root: ShadowRoot, q: string) =>
    [...root.querySelectorAll(`.quad.${q} .tile`)].map((n) => ({
      title: n.querySelector(".tile-title")!.textContent!.trim(),
      sub: [...n.querySelectorAll(".tile-flag, .tile-due")]
        .map((x) => x.textContent!.replace(/\s+/g, " ").trim())
        .join(" | "),
    }));

  it("counts a task a context rule marks urgent as urgent, with the rule's note", async () => {
    const { root } = await mount(
      {
        eisenhower: true,
        persons: [{ name: "Papa", lists: "todo.papa" }],
        context_rules: [
          {
            match: "müll",
            entity: "binary_sensor.abfuhr_morgen",
            state: "on",
            effect: "urgent",
            label: "Morgen Abfuhr!",
          },
        ],
      },
      {
        lists: { "todo.papa": { items: [task("m", "Müll rausbringen")] } },
        states: { "binary_sensor.abfuhr_morgen": { state: "on" } },
      },
    );
    expect(quad(root, "later")).toEqual([]);
    expect(quad(root, "delegate")).toEqual([
      { title: "Müll rausbringen", sub: "Morgen Abfuhr! | Papa" },
    ]);
  });

  it("shows a task of a list two persons share once, with both names", async () => {
    const { root } = await mount(
      {
        eisenhower: true,
        persons: [
          { name: "Mama", lists: ["todo.familie", "todo.mama"] },
          { name: "Papa", lists: "todo.familie" },
        ],
      },
      {
        lists: {
          "todo.familie": { items: [task("f", "Garage aufräumen")] },
          "todo.mama": { items: [task("m", "Yoga")] },
        },
      },
    );
    expect(quad(root, "later")).toEqual([
      { title: "Garage aufräumen", sub: "Mama & Papa" },
      { title: "Yoga", sub: "Mama" },
    ]);
  });
  it("counts a shared task as important if one of them marked the list so", async () => {
    const { root } = await mount(
      {
        eisenhower: true,
        persons: [
          { name: "Papa", lists: "todo.familie" },
          { name: "Mama", lists: [{ entity: "todo.familie", important: true }] },
        ],
      },
      { lists: { "todo.familie": { items: [task("s", "Steuer")] } } },
    );
    expect(quad(root, "plan")).toEqual([{ title: "Steuer", sub: "Papa & Mama" }]);
  });
});

describe("visual editor covers everything", () => {
  type Ed = HTMLElement & {
    setConfig(c: unknown): void;
    hass: unknown;
    [k: string]: unknown;
  };
  const value = (v: unknown) => new CustomEvent("value-changed", { detail: { value: v } });

  async function editor(config: Record<string, unknown>) {
    await import("./editor");
    const ed = document.createElement("family-task-card-editor") as Ed;
    ed.hass = {
      locale: { language: "de" },
      states: { "todo.a": { attributes: { friendly_name: "Haushalt" } } },
    };
    ed.setConfig({ type: "custom:family-task-card", persons: [], ...config });
    const out: { last?: Record<string, any> } = {};
    ed.addEventListener("config-changed", (e) => {
      out.last = (e as CustomEvent).detail.config;
      ed.setConfig(out.last); // like the HA dashboard editor does
    });
    const call = (name: string, ...args: unknown[]) =>
      (ed[name] as (...a: unknown[]) => unknown).apply(ed, args);
    return { ed, out, call };
  }

  const names = (schema: any[]): string[] =>
    schema.flatMap((s) => (Array.isArray(s.schema) ? names(s.schema) : [s.name]));

  it("offers every option from the README in the menu", async () => {
    const { readFileSync } = await import("node:fs");
    const readme = readFileSync(`${process.cwd()}/README.md`, "utf8");
    const documented = [...readme.matchAll(/^\| `([a-z_.[\]]+)` \|/gm)].map((m) => m[1]);
    expect(documented.length).toBeGreaterThan(40);

    // every switch on, so the options that depend on one are shown too
    const { call } = await editor({
      eisenhower: true,
      kiosk: true,
      rotation: true,
      show_leaderboard: true,
      show_fairness: true,
      points_backend: true,
    });
    const menu = new Set([
      ...names(call("_schema") as any[]),
      "parent_pin", // rewards panel
      ...((call("_ruleSchema") as any[]).length ? ["context_rules"] : []),
      ...((call("_celebrateSchema") as any[]).length ? ["celebrate"] : []),
      "rewards",
      "persons",
      // persons[].x: the person form, plus the colour swatches
      ...[...names(call("_personSchema") as any[]), "color"].map((k) => `persons[].${k}`),
    ]);
    const missing = documented.filter((k) => !menu.has(k));
    expect(missing).toEqual([]);
  });

  it("groups the settings into sections", async () => {
    const { call } = await editor({});
    const schema = call("_schema") as any[];
    expect(schema.every((s) => s.type === "expandable" && s.flatten)).toBe(true);
    expect(schema.map((s) => s.title)).toEqual([
      "Allgemein",
      "Modus",
      "Aufgaben & Filter",
      "Ämtli-Rotation",
      "Punkte & Level",
      "Einkauf (Bring!)",
      "Darstellung",
    ]);
  });

  it("adds, edits and removes rewards", async () => {
    const { call, out } = await editor({});
    call("_addReward");
    expect(out.last!.rewards).toEqual([{ name: "", cost: 50, emoji: "🎁" }]);
    call("_rewardChanged", 0, value({ name: "Eis", cost: "30", emoji: "" }));
    expect(out.last!.rewards).toEqual([{ name: "Eis", cost: 30 }]);
    call("_removeReward", 0);
    expect(out.last!.rewards).toBeUndefined();
  });

  it("edits context rules without losing YAML-only options", async () => {
    const { call, out } = await editor({
      context_rules: [{ entity: "weather.home", effect: "hide", lists: ["todo.a"], above: 3 }],
    });
    call("_ruleChanged", 0, value({ match: "gieß", state: "rainy, pouring", invert: false }));
    expect(out.last!.context_rules).toEqual([
      {
        entity: "weather.home",
        effect: "hide",
        lists: ["todo.a"],
        above: 3,
        match: "gieß",
        state: ["rainy", "pouring"],
      },
    ]);
    call("_ruleChanged", 0, value({ state: "snowy" }));
    expect(out.last!.context_rules[0].state).toBe("snowy");
    call("_addRule");
    expect(out.last!.context_rules[1]).toEqual({ entity: "", effect: "highlight" });
  });

  it("stores celebrate actions from the HA action editor", async () => {
    const { call, out } = await editor({});
    const actions = [{ action: "light.turn_on", target: { entity_id: "light.kids" } }];
    call("_celebrateChanged", value({ on: ["all_done"], actions }));
    expect(out.last!.celebrate).toEqual({ actions }); // "all done" is the default
    call("_celebrateChanged", value({ on: ["task"], actions }));
    expect(out.last!.celebrate).toEqual({ on: "task", actions });
    call("_celebrateChanged", value({ on: ["all_done"], actions: [] }));
    expect(out.last!.celebrate).toBeUndefined();
  });

  it("keeps the chosen moment before any action is added", async () => {
    const { call, out } = await editor({});
    call("_celebrateChanged", value({ on: ["task"], actions: [] }));
    expect(out.last!.celebrate).toEqual({ on: "task", actions: [] });
    expect(call("_celebrateData")).toEqual({ on: ["task"], actions: [] });
  });

  it("sets per-list switches and drops them again", async () => {
    const { call, out } = await editor({
      persons: [{ name: "Anna", lists: ["todo.a", "todo.b"] }],
    });
    call("_listSettingsChanged", 0, "todo.b", value({ important: true, show_within: 0 }));
    expect(out.last!.persons[0].lists).toEqual([
      "todo.a",
      { entity: "todo.b", important: true, show_within: 0 },
    ]);
    call("_listSettingsChanged", 0, "todo.b", value({ important: false }));
    expect(out.last!.persons[0].lists).toEqual(["todo.a", "todo.b"]);
  });

  it("switches options off and empties fields for good", async () => {
    // ha-form sends the whole form data with the change
    const { ed, call, out } = await editor({ kid_mode: true, title: "Alt", theme: "dark" });
    const data = ed["_settingsData"] as Record<string, unknown>;
    call("_settingsChanged", value({ ...data, kid_mode: false, title: "", theme: "auto" }));
    expect(out.last!.kid_mode).toBeUndefined();
    expect(out.last!.title).toBeUndefined();
    expect(out.last!.theme).toBeUndefined();
    expect(out.last!.persons).toEqual([]); // untouched parts stay
  });

  it("keeps 0 where 0 means something", async () => {
    // 0 = never return / no points for shopping / PIN 0 (e.g. "0000" in YAML)
    const { ed, call, out } = await editor({
      kiosk: true,
      auto_return: 0,
      shopping_points: 0,
      parent_pin: 0,
    });
    const data = ed["_settingsData"] as Record<string, unknown>;
    call("_settingsChanged", value({ ...data, title: "Neu" }));
    expect(out.last).toMatchObject({ auto_return: 0, shopping_points: 0, parent_pin: 0 });
    call(
      "_settingsChanged",
      value({ ...data, auto_return: undefined, shopping_points: undefined }),
    );
    expect(out.last!.auto_return).toBeUndefined(); // emptied: back to the default
    expect(out.last!.shopping_points).toBeUndefined();
  });

  it("keeps an agreed share of 0 % and drops an emptied one", async () => {
    const { call, out } = await editor({ persons: [{ name: "Ben", share: 20 }] });
    call("_personChanged", 0, value({ name: "Ben", share: 0 }));
    expect(out.last!.persons[0]).toEqual({ name: "Ben", share: 0 });
    call("_personChanged", 0, value({ name: "Ben", share: undefined }));
    expect(out.last!.persons[0]).toEqual({ name: "Ben" });
  });

  it("offers the fair-share period only with the bar on, and stores week as default", async () => {
    const names = (schema: any[]): string[] =>
      schema.flatMap((s) => (Array.isArray(s.schema) ? names(s.schema) : [s.name]));
    const off = await editor({});
    expect(names(off.call("_schema") as any[])).not.toContain("fairness_period");
    const { ed, call, out } = await editor({ show_fairness: true, fairness_period: "month" });
    expect(names(call("_schema") as any[])).toContain("fairness_period");
    const data = ed["_settingsData"] as Record<string, unknown>;
    call("_settingsChanged", value({ ...data, fairness_period: "week" }));
    expect(out.last!.fairness_period).toBeUndefined();
    expect(out.last!.show_fairness).toBe(true);
  });

  it("lets a list differ from the card both ways", async () => {
    const { call, out } = await editor({
      hide_undated: true,
      show_within: 30,
      persons: [{ name: "Anna", lists: ["todo.a", "todo.b"] }],
    });
    // the form shows what applies to the list: here the card's settings
    expect(call("_listData", "todo.b")).toEqual({
      important: false,
      hide_undated: true,
      show_within: 30,
    });
    // dates don't matter for this list: show undated tasks and everything ahead
    call("_listSettingsChanged", 0, "todo.b", value({ hide_undated: false }));
    const own = out.last!.persons[0].lists[1];
    expect(own).toEqual({ entity: "todo.b", hide_undated: false, show_within: -1 });
    expect(call("_listData", own)).toEqual({
      important: false,
      hide_undated: false,
      show_within: undefined,
    });
    // back to the card's values: the list follows the card again
    call("_listSettingsChanged", 0, "todo.b", value({ hide_undated: true, show_within: 30 }));
    expect(out.last!.persons[0].lists).toEqual(["todo.a", "todo.b"]);
  });

  it("keeps what is being typed into a field that holds a list", async () => {
    const { ed, call, out } = await editor({
      level_emojis: ["🌱", "⭐"],
      context_rules: [{ entity: "weather.home", effect: "hide", state: ["rainy", "pouring"] }],
    });
    const data = () => ed["_settingsData"] as Record<string, unknown>;
    // ⭐ deleted to type another badge: the space before it must stay
    call("_settingsChanged", value({ ...data(), level_emojis: "🌱 " }));
    expect(out.last!.level_emojis).toEqual(["🌱"]);
    expect(data().level_emojis).toBe("🌱 ");
    call("_ruleChanged", 0, value({ state: "rainy, " }));
    expect(out.last!.context_rules[0].state).toBe("rainy");
    expect((call("_ruleData", out.last!.context_rules[0], 0) as any).state).toBe("rainy, ");
    // changed elsewhere (YAML): the stored value wins
    ed.setConfig({ ...out.last!, level_emojis: ["👑"] });
    expect(data().level_emojis).toBe("👑");
  });

  it("offers only entities whose value can name the active person", async () => {
    // a person.* entity is home / not_home – never a name
    const { call } = await editor({});
    const field = (call("_schema") as any[])
      .flatMap((s) => s.schema)
      .find((f: any) => f.name === "active_person_entity");
    const domains = field.selector.entity.filter.map((f: any) => f.domain);
    expect(domains).not.toContain("person");
    expect(domains).toEqual(expect.arrayContaining(["input_select", "sensor"]));
  });

  it("takes level badges as text", async () => {
    const { call, out } = await editor({});
    call("_settingsChanged", value({ level_emojis: "🌱, ⭐ 🔥" }));
    expect(out.last!.level_emojis).toEqual(["🌱", "⭐", "🔥"]);
    call("_settingsChanged", value({ level_emojis: "" }));
    expect(out.last!.level_emojis).toBeUndefined();
  });
});

describe("celebrate actions from the HA action editor", () => {
  it("runs actions written as `action:`", async () => {
    const { services, all, settle } = await mount(
      {
        persons: [{ name: "Anna", lists: "todo.anna" }],
        celebrate: {
          on: "task",
          actions: [{ action: "light.turn_on", target: { entity_id: "light.kids" } }],
        },
      },
      { lists: { "todo.anna": { items: [task("a1", "Zimmer")] } } },
    );
    (all(".tile")[0] as HTMLElement).click();
    await settle();
    expect(services).toContainEqual({
      domain: "light",
      service: "turn_on",
      data: {},
      target: { entity_id: "light.kids" },
    });
  });

  it("runs the steps one after another, waiting where asked", async () => {
    const { services, all, settle } = await mount(
      {
        persons: [{ name: "Anna", lists: "todo.anna" }],
        celebrate: {
          on: "task",
          actions: [
            { action: "light.turn_on", data: { entity_id: "light.kids" } },
            { delay: { seconds: 5 } },
            { action: "light.turn_off", data: { entity_id: "light.kids" } },
          ],
        },
      },
      { lists: { "todo.anna": { items: [task("a1", "Zimmer")] } } },
    );
    const lights = () => services.filter((s) => s.domain === "light").map((s) => s.service);
    (all(".tile")[0] as HTMLElement).click();
    await settle();
    expect(lights()).toEqual(["turn_on"]);
    await vi.advanceTimersByTimeAsync(5000);
    expect(lights()).toEqual(["turn_on", "turn_off"]);
  });

  it("skips switched-off steps and stops at an unmet condition", async () => {
    const { services, all, settle } = await mount(
      {
        persons: [{ name: "Anna", lists: "todo.anna" }],
        celebrate: {
          on: "task",
          actions: [
            { action: "light.turn_on", enabled: false },
            { action: "light.toggle" },
            { condition: "state", entity_id: "input_boolean.quiet", state: "off" },
            { action: "tts.speak" },
          ],
        },
      },
      {
        lists: { "todo.anna": { items: [task("a1", "Zimmer")] } },
        states: { "input_boolean.quiet": { state: "on" } },
      },
    );
    (all(".tile")[0] as HTMLElement).click();
    await settle();
    const fired = services.filter((s) => s.domain !== "todo").map((s) => s.service);
    expect(fired).toEqual(["toggle"]);
  });

  it("celebrates 'all done' only on the device where it happened", async () => {
    const allDone = { actions: [{ action: "tts.speak" }] };
    const lists = { "todo.anna": { items: [task("a1", "Müll")] } };
    const anna = { name: "Anna", lists: "todo.anna" };
    const tts = (services: ServiceCall[]) => services.filter((s) => s.domain === "tts");
    // the wall tablet: Anna checks off her last task there
    const tablet = await mount({ persons: [anna], celebrate: allDone }, { lists });
    (tablet.all(".tile")[0] as HTMLElement).click();
    await tablet.settle();
    expect(tts(tablet.services)).toHaveLength(1);
    // the same card on the parents' phone sees the list change, too
    const phone = await mount({ persons: [anna], celebrate: allDone }, { lists });
    update(
      phone.el,
      { "todo.anna": { state: "0", last_changed: "checked on the tablet" } },
      { callWS: async () => ({ items: [done("a1", "Müll")] }) },
    );
    await phone.settle();
    expect(phone.text()).not.toContain("Müll");
    expect(tts(phone.services)).toEqual([]); // announced once, not on every screen
  });
});

describe("shorthand in titles (title_tags)", () => {
  const FT = { family_tasks: { award: {}, revoke: {}, redeem: {}, adjust: {} } };
  const lina = { name: "Lina", lists: ["todo.familie", "todo.lina"] };
  const ben = { name: "Ben", lists: ["todo.familie", "todo.ben"] };
  const family = (familie: unknown[], own: { lina?: unknown[]; ben?: unknown[] } = {}) => ({
    lists: {
      "todo.familie": { items: familie },
      "todo.lina": { items: own.lina ?? [] },
      "todo.ben": { items: own.ben ?? [] },
    },
  });
  const columns = (root: ShadowRoot) =>
    [...root.querySelectorAll(".col")].map((c) =>
      [...c.querySelectorAll(".tile-title")].map((n) => (n.textContent ?? "").trim()),
    );
  const calls = (services: ServiceCall[], name: string) =>
    services.filter((s) => s.domain === "family_tasks" && s.service === name).map((s) => s.data);

  it("changes nothing while switched off", async () => {
    const { root } = await mount(
      { persons: [lina, ben] },
      family([task("f1", "Zimmer @Lina +20")]),
    );
    expect(columns(root)).toEqual([["Zimmer @Lina +20"], ["Zimmer @Lina +20"]]);
  });

  it("gives a task of a shared list to the person it names, without the tags", async () => {
    const { root } = await mount(
      { persons: [lina, ben], title_tags: true },
      family([task("f1", "Zimmer aufräumen @Lina +20"), task("f2", "Tisch decken")]),
    );
    expect(columns(root)).toEqual([["Tisch decken", "Zimmer aufräumen"], ["Tisch decken"]]);
  });

  it("moves a task from one person's list to the person it names", async () => {
    const { root } = await mount(
      { persons: [lina, ben], title_tags: true },
      family([], { ben: [task("b1", "Hausaufgaben zeigen @lina")] }),
    );
    expect(columns(root)).toEqual([["Hausaufgaben zeigen"], []]);
  });

  it("counts the points a title gives", async () => {
    const { texts } = await mount(
      { persons: [{ name: "Lina", lists: "todo.lina" }], title_tags: true },
      { lists: { "todo.lina": { items: [done("l1", "Bad putzen +30"), done("l2", "Bett")] } } },
    );
    expect(texts(".col-meta").join(" ")).toContain("⭐ 40"); // 30 + the usual 10
  });

  it("books the points for everyone named, with the clean title", async () => {
    const { services, el, settle } = await mount(
      { persons: [lina, ben], title_tags: true, points_backend: true },
      {
        ...family([done("f1", "Garage @Lina @Ben +40"), done("f2", "Zimmer @Ben")]),
        services: FT,
      },
    );
    (el as unknown as { requestUpdate(): void }).requestUpdate();
    await settle();
    expect(calls(services, "award")).toEqual([
      { key: "todo.familie|f1", person: "Lina", points: 40, task: "Garage" },
      { key: "todo.familie|f1|Ben", person: "Ben", points: 40, task: "Garage" },
      { key: "todo.familie|f2", person: "Ben", points: 10, task: "Zimmer" },
    ]);
  });

  it("takes the points back from everyone it was for", async () => {
    const { services, all, settle } = await mount(
      { persons: [lina, ben], title_tags: true, points_backend: true, show_completed: true },
      { ...family([done("f1", "Garage @Lina @Ben +40")]), services: FT },
    );
    (all(".tile.done")[0] as HTMLElement).click();
    await settle();
    expect(calls(services, "revoke")).toEqual([
      { key: "todo.familie|f1" },
      { key: "todo.familie|f1|Ben" },
    ]);
  });

  it("keeps a rotating chore with the person it names, the others take turns", async () => {
    const config = {
      persons: [{ name: "Lina" }, { name: "Ben" }],
      title_tags: true,
      rotation: true,
      rotation_lists: "todo.aemtli",
    };
    const chores = {
      lists: {
        "todo.aemtli": {
          items: [
            task("c1", "Müll", { due: "2026-10-11" }),
            task("c2", "Spülmaschine @Ben", { due: "2026-10-11" }),
            task("c3", "Bad", { due: "2026-10-11" }),
          ],
          features: CREATE | UPDATE | 16,
        },
      },
    };
    const week1 = await mount(config, { ...chores, now: "2026-10-07T10:00:00" });
    const week2 = await mount(config, { ...chores, now: "2026-10-14T10:00:00" });
    for (const { root } of [week1, week2]) {
      const [l, b] = columns(root);
      expect(b).toContain("Spülmaschine");
      expect(l).not.toContain("Spülmaschine");
      expect(l).toHaveLength(1); // Müll or Bad
    }
    expect(columns(week1.root)[0]).not.toEqual(columns(week2.root)[0]); // they swapped
    const fixed = week1.all(".tile").find((t) => t.textContent!.includes("Spülmaschine"))!;
    expect(fixed.textContent).not.toContain("🔄");
  });

  it("takes a shopping item named for someone out of the trip", async () => {
    const { root, texts } = await mount(
      {
        persons: [
          { name: "Anna", lists: ["todo.anna", "todo.bring"] },
          { name: "Ben", lists: "todo.ben" },
        ],
        shopping_lists: "todo.bring",
        title_tags: true,
      },
      {
        lists: {
          "todo.anna": { items: [] },
          "todo.ben": { items: [] },
          "todo.bring": {
            items: [task("s1", "Milch @Ben"), task("s2", "Brot"), task("s3", "Eier")],
          },
        },
      },
    );
    expect(texts(".tile.shopping .tile-due")).toEqual(["2 Artikel"]);
    const [, benCol] = [...root.querySelectorAll(".col")];
    expect(benCol.querySelector(".tile-title")!.textContent!.trim()).toBe("Milch");
    expect(benCol.querySelector(".tile-emoji")!.textContent).toBe("🛒");
  });

  it("names the person when a task is added on a list others share", async () => {
    const add = async (config: Partial<FamilyTaskConfig>, lists: MountOpts["lists"]) => {
      const m = await mount(config, { lists });
      const input = m.all(".add-input")[0] as HTMLInputElement;
      input.value = "Zimmer";
      input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter" }));
      await m.settle();
      return m.services.find((s) => s.service === "add_item")?.data;
    };
    const shared = family([]).lists;
    expect(await add({ persons: [lina, ben], title_tags: true }, shared)).toEqual({
      entity_id: "todo.familie",
      item: "Zimmer @Lina",
    });
    expect(await add({ persons: [lina, ben] }, shared)).toMatchObject({ item: "Zimmer" });
    const own = { "todo.lina": { items: [] } };
    expect(
      await add({ persons: [{ name: "Lina", lists: "todo.lina" }], title_tags: true }, own),
    ).toMatchObject({ item: "Zimmer" });
  });

  it("shows the clean title in kid mode and names the person in the Eisenhower view", async () => {
    const kid = await mount(
      { persons: [lina], kid_mode: true, title_tags: true },
      family([task("f1", "Zimmer aufräumen @Lina +20")]),
    );
    expect(kid.texts(".kid-task-title")).toEqual(["Zimmer aufräumen"]);
    const matrix = await mount(
      { persons: [lina, ben], eisenhower: true, title_tags: true },
      family([task("f1", "!Steuer @Ben")]),
    );
    const tile = matrix.root.querySelector(".quad.plan .tile")!;
    expect(tile.querySelector(".tile-title")!.textContent!.trim()).toBe("Steuer");
    expect(tile.querySelector(".tile-due")!.textContent!.trim()).toBe("Ben");
  });
});

describe("shorthand in titles: celebrate", () => {
  it("names the person a task is for in celebrate actions", async () => {
    const { all, services, settle } = await mount(
      {
        persons: [
          { name: "Lina", lists: "todo.familie" },
          { name: "Ben", lists: "todo.familie" },
        ],
        title_tags: true,
        celebrate: {
          on: "task",
          actions: [{ action: "tts.speak", data: { message: "{name}: {task}" } }],
        },
      },
      { lists: { "todo.familie": { items: [task("f1", "Zimmer aufräumen @Ben +20")] } } },
    );
    (all(".tile")[0] as HTMLElement).click();
    await settle();
    expect(services.find((s) => s.domain === "tts")?.data).toEqual({
      message: "Ben: Zimmer aufräumen",
    });
  });
});

describe("fair share (show_fairness)", () => {
  const mama = { name: "Mama", person: "person.mama", lists: "todo.mama" };
  const papa = { name: "Papa", person: "person.papa", lists: "todo.papa" };
  const lists = (mamaDone: number, papaItems: unknown[] = [done("p1", "Müll")]) => ({
    "todo.mama": {
      items: Array.from({ length: mamaDone }, (_, i) => done(`m${i}`, `Aufgabe ${i}`)),
    },
    "todo.papa": { items: papaItems },
  });
  const sensor = (who: string, week: number, month: number) => ({
    [`sensor.${who}_points`]: {
      entity_id: `sensor.${who}_points`,
      state: "0",
      last_changed: "x",
      attributes: { person: `person.${who}`, earned: 500, week_points: week, month_points: month },
    },
  });
  const FT = { family_tasks: { award: {}, revoke: {}, redeem: {}, adjust: {} } };

  it("stays off unless switched on", async () => {
    const { all } = await mount({ persons: [mama, papa] }, { lists: lists(3) });
    expect(all(".fairness")).toHaveLength(0);
  });

  it("shows each person's share of the points, live from the lists", async () => {
    const { texts, all } = await mount(
      { persons: [mama, papa], show_fairness: true },
      { lists: lists(3) },
    );
    expect(texts(".fair-item")).toEqual(["Mama 75 %", "Papa 25 %"]);
    const widths = all(".fair-seg").map((s) => s.getAttribute("style")!.split(";")[0]);
    expect(widths).toEqual(["flex:0.75", "flex:0.25"]);
  });

  it("counts a task by what it is worth", async () => {
    const { texts } = await mount(
      { persons: [mama, papa], show_fairness: true, title_tags: true },
      { lists: lists(3, [done("p1", "Garage ausmisten +30")]) },
    );
    expect(texts(".fair-item")).toEqual(["Mama 50 %", "Papa 50 %"]);
  });

  it("takes this week's points from the ledger, or this month's", async () => {
    const opts = {
      lists: lists(0, []),
      services: FT,
      states: { ...sensor("mama", 30, 100), ...sensor("papa", 10, 300) },
    };
    const week = await mount(
      { persons: [mama, papa], show_fairness: true, points_backend: true },
      opts,
    );
    expect(week.texts(".fair-item")).toEqual(["Mama 75 %", "Papa 25 %"]);
    expect(week.texts(".fairness .lb-title")[0]).toContain("diese Woche");
    const month = await mount(
      {
        persons: [mama, papa],
        show_fairness: true,
        points_backend: true,
        fairness_period: "month",
      },
      opts,
    );
    expect(month.texts(".fair-item")).toEqual(["Mama 25 %", "Papa 75 %"]);
    expect(month.texts(".fairness .lb-title")[0]).toContain("diesen Monat");
  });

  it("compares with the share agreed for each person", async () => {
    const agreed = [
      { ...mama, share: 50 },
      { ...papa, share: 50 },
    ];
    const off = await mount({ persons: agreed, show_fairness: true }, { lists: lists(3) });
    expect(off.texts(".fair-target")).toEqual(["Soll 50 % ▲", "Soll 50 % ▼"]);
    const kept = await mount(
      {
        persons: [
          { ...mama, share: 55 },
          { ...papa, share: 45 },
        ],
        show_fairness: true,
      },
      { lists: lists(1) },
    );
    expect(kept.texts(".fair-target")).toEqual(["Soll 55 % ✓", "Soll 45 % ✓"]); // 50/50 is close
  });

  it("says so when nothing is done yet", async () => {
    const { all, texts } = await mount(
      { persons: [mama, papa], show_fairness: true },
      { lists: lists(0, []) },
    );
    expect(all(".fair-bar")).toHaveLength(0);
    expect(texts(".fair-none")).toEqual(["Noch nichts erledigt"]);
  });

  it("needs two persons, and shows under the Eisenhower view too", async () => {
    const single = await mount({ persons: [mama], show_fairness: true }, { lists: lists(3) });
    expect(single.all(".fairness")).toHaveLength(0);
    const matrix = await mount(
      { persons: [mama, papa], show_fairness: true, eisenhower: true },
      { lists: lists(3) },
    );
    expect(matrix.texts(".fair-item")).toEqual(["Mama 75 %", "Papa 25 %"]);
  });
});

describe("rotation: who is away", () => {
  const ROT = CREATE | UPDATE | 16;
  const kids = ["Lina", "Ben", "Mia"].map((name) => ({
    name,
    away_entity: `input_boolean.${name.toLowerCase()}_weg`,
  }));
  const config = { persons: kids, rotation: true, rotation_lists: "todo.aemtli" };
  const chores = ["Bad", "Fenster", "Küche", "Müll", "Spülen", "Wäsche"].map((s, i) =>
    task(`c${i}`, s, { due: "2026-10-11" }),
  );
  const lists = { "todo.aemtli": { items: chores, features: ROT } };
  const away = (who: Record<string, "on" | "off">) =>
    Object.fromEntries(
      Object.entries(who).map(([k, v]) => [`input_boolean.${k}_weg`, { state: v, attributes: {} }]),
    );
  const columns = (root: ShadowRoot) =>
    [...root.querySelectorAll(".col")].map((c) =>
      [...c.querySelectorAll(".tile-title")].map((n) => (n.textContent ?? "").trim()),
    );
  const now = "2026-10-07T10:00:00";

  it("gives the chores of someone away to the others, who keep their own", async () => {
    const usual = columns((await mount(config, { lists, now })).root);
    expect(usual.map((c) => c.length)).toEqual([2, 2, 2]);
    const [lina, ben, mia] = usual;
    const [lina2, ben2, mia2] = columns(
      (await mount(config, { lists, now, states: away({ ben: "on" }) })).root,
    );
    expect(ben2).toEqual([]);
    expect(lina2).toEqual(expect.arrayContaining(lina));
    expect(mia2).toEqual(expect.arrayContaining(mia));
    expect([lina2.length, mia2.length]).toEqual([3, 3]); // shared out evenly
    expect([...lina2, ...mia2].sort()).toEqual([...lina, ...ben, ...mia].sort());
  });

  it("follows the switch while the card is open", async () => {
    const m = await mount(config, { lists, now, states: away({ ben: "off" }) });
    expect(columns(m.root)[1]).toHaveLength(2);
    update(m.el, { "input_boolean.ben_weg": { state: "on" } });
    await m.settle();
    expect(columns(m.root)[1]).toEqual([]);
    update(m.el, { "input_boolean.ben_weg": { state: "off" } });
    await m.settle();
    expect(columns(m.root)[1]).toHaveLength(2);
  });

  it("says whose chore it is and who is away", async () => {
    const { text, texts } = await mount(config, { lists, now, states: away({ ben: "on" }) });
    expect(text()).toContain("🤝 statt Ben");
    expect(texts(".col-head")[1]).toContain("✈️ weg");
    expect(texts(".col-head")[0]).not.toContain("✈️");
  });

  it("takes the usual turns when nobody or everybody is away", async () => {
    const usual = columns((await mount(config, { lists, now })).root);
    const off = await mount(config, { lists, now, states: away({ lina: "off", ben: "off" }) });
    expect(columns(off.root)).toEqual(usual);
    const all = await mount(config, {
      lists,
      now,
      states: away({ lina: "on", ben: "on", mia: "on" }),
    });
    expect(columns(all.root)).toEqual(usual);
  });

  it("pays whoever covered", async () => {
    const { services } = await mount(
      { ...config, persons: kids.slice(0, 2), points_backend: true },
      {
        lists: {
          "todo.aemtli": {
            items: [task("c1", "Müll", { status: "completed", due: "2026-10-11" })],
            features: ROT,
          },
        },
        services: { family_tasks: { award: {}, revoke: {}, redeem: {}, adjust: {} } },
        now,
        states: away({ lina: "on" }),
      },
    );
    const awards = services.filter((s) => s.service === "award").map((s) => s.data);
    expect(awards).toEqual([
      { key: "todo.aemtli|c1|2026-10-11", person: "Ben", points: 10, task: "Müll" },
    ]);
  });

  it("asks for the away switch only with the rotation on", async () => {
    await import("./editor");
    const names = async (config: Record<string, unknown>) => {
      const ed = document.createElement("family-task-card-editor") as HTMLElement & {
        setConfig(c: unknown): void;
        hass: unknown;
        _personSchema(): Array<{ name: string }>;
      };
      ed.hass = { locale: { language: "de" }, states: {} };
      ed.setConfig({ type: "custom:family-task-card", persons: [], ...config });
      return ed._personSchema().map((s) => s.name);
    };
    expect(await names({})).not.toContain("away_entity");
    expect(await names({ rotation: true })).toContain("away_entity");
    expect(await names({})).not.toContain("share");
    expect(await names({ show_fairness: true })).toContain("share");
  });
});

describe("handing chores over (chore_swap)", () => {
  const SWAP = {
    family_tasks: {
      award: {},
      revoke: {},
      redeem: {},
      adjust: {},
      offer_chore: {},
      answer_offer: {},
    },
  };
  const persons = [
    { name: "Lina", person: "person.lina" },
    { name: "Ben", person: "person.ben" },
  ];
  const config = {
    persons,
    rotation: true,
    rotation_lists: "todo.aemtli",
    points_backend: true,
    chore_swap: true,
  };
  const now = "2026-10-07T10:00:00"; // the round runs to Sunday 11 Oct
  const chore = (status = "needs_action") => ({
    "todo.aemtli": {
      items: [task("c1", "Müll", { status, due: "2026-10-11" })],
      features: CREATE | UPDATE | 16,
    },
  });
  const ledger = (who: string, extra: Record<string, unknown> = {}) => ({
    [`sensor.${who}_points`]: {
      entity_id: `sensor.${who}_points`,
      state: "0",
      last_changed: "x",
      attributes: { person: `person.${who}`, earned: 30, redeemed: 0, reserved: 0, ...extra },
    },
  });
  const offer = (extra: Record<string, unknown> = {}) => ({
    id: "o1",
    key: "todo.aemtli|c1|2026-10-11",
    chore: "Müll",
    from: "person.lina",
    to: "person.ben",
    points: 10,
    until: "2026-10-11",
    accepted: false,
    ...extra,
  });
  /** Who has the chore this round: whatever the turn order says. */
  const owner = (root: ShadowRoot) =>
    [...root.querySelectorAll(".col")].findIndex((c) => c.textContent!.includes("Müll"));
  const calls = (services: ServiceCall[], name: string) =>
    services.filter((s) => s.domain === "family_tasks" && s.service === name).map((s) => s.data);

  it("offers nothing unless switched on and the integration knows offers", async () => {
    const off = await mount(
      { ...config, chore_swap: false },
      { lists: chore(), now, services: SWAP },
    );
    expect(off.all(".swap-btn")).toHaveLength(0);
    const old = await mount(config, {
      lists: chore(),
      now,
      services: { family_tasks: { award: {}, revoke: {}, redeem: {}, adjust: {} } },
    });
    expect(old.all(".swap-btn")).toHaveLength(0);
  });

  it("offers a chore to someone else, for points", async () => {
    // whoever has it this round offers it; the other one gets the offer
    const probe = await mount(config, { lists: chore(), now, services: SWAP });
    const from = owner(probe.root);
    const who = ["lina", "ben"];
    const m = await mount(config, {
      lists: chore(),
      now,
      services: SWAP,
      states: { ...ledger(who[from], { earned: 15 }), ...ledger(who[1 - from]) },
    });
    (m.all(".swap-btn")[0] as HTMLElement).click();
    await m.settle();
    expect(m.all(".offer")).toHaveLength(1); // under the chore's own column only
    const chips = m.all(".offer .chip") as HTMLButtonElement[];
    const byText = (t: string) => chips.find((c) => c.textContent!.trim() === t)!;
    expect(byText("+20").disabled).toBe(true); // 15 points to spare
    byText(persons[1 - from].name).click();
    await m.settle();
    byText("+10").click();
    await m.settle();
    (m.root.querySelector(".offer .reward-btn") as HTMLElement).click();
    await m.settle();
    expect(calls(m.services, "offer_chore")).toEqual([
      {
        key: "todo.aemtli|c1|2026-10-11",
        person: `person.${who[from]}`,
        to: `person.${who[1 - from]}`,
        points: 10,
        chore: "Müll",
        until: "2026-10-11",
      },
    ]);
    expect(m.all(".offer")).toHaveLength(0); // sent: the panel closes
  });

  it("shows an open offer on both sides: withdraw, or take it over", async () => {
    const probe = await mount(config, { lists: chore(), now, services: SWAP });
    const from = owner(probe.root);
    const who = ["lina", "ben"];
    const open = offer({ from: `person.${who[from]}`, to: `person.${who[1 - from]}` });
    const m = await mount(config, {
      lists: chore(),
      now,
      services: SWAP,
      states: {
        ...ledger(who[from], { offers: [open] }),
        ...ledger(who[1 - from], { offers: [open] }),
      },
    });
    const cols = [...m.root.querySelectorAll(".col")];
    expect(cols[from].textContent).toContain(`⏳ angeboten an ${persons[1 - from].name} · +10`);
    expect(cols[from].querySelector(".offer-in")).toBeNull(); // not for the one offering
    const row = cols[1 - from].querySelector(".offer-in")!;
    expect(row.textContent!.replace(/\s+/g, " ")).toContain(
      `🔁 ${persons[from].name} gibt dir Müll · +10 ⭐`,
    );
    (cols[from].querySelector(".swap-btn") as HTMLElement).click(); // ✕: withdraw
    (row.querySelector(".reward-btn.approve") as HTMLElement).click();
    await m.settle();
    expect(calls(m.services, "answer_offer")).toEqual([
      { offer_id: "o1", accept: false },
      { offer_id: "o1", accept: true },
    ]);
    // the ✕ sits on the tile: the tile itself must not be checked off
    expect(m.services.filter((s) => s.domain === "todo")).toEqual([]);
  });

  it("gives a chore taken over to whoever took it, with the points", async () => {
    const probe = await mount(config, { lists: chore(), now, services: SWAP });
    const from = owner(probe.root);
    const who = ["lina", "ben"];
    const taken = offer({
      from: `person.${who[from]}`,
      to: `person.${who[1 - from]}`,
      accepted: true,
    });
    const states = {
      ...ledger(who[from], { offers: [taken], transferred: -10 }),
      ...ledger(who[1 - from], { offers: [taken], transferred: 10 }),
    };
    const m = await mount(config, { lists: chore(), now, services: SWAP, states });
    expect(owner(m.root)).toBe(1 - from);
    expect(m.text()).toContain(`🔁 von ${persons[from].name}`);
    expect(m.all(".swap-btn")).toHaveLength(0); // taken over once is enough
    const metas = m.texts(".col-meta");
    expect(metas[from]).toContain("💰 20"); // 30 earned, 10 paid
    expect(metas[1 - from]).toContain("💰 40"); // 30 earned, 10 received
    const doneM = await mount(config, {
      lists: chore("completed"),
      now,
      services: SWAP,
      states,
    });
    expect(calls(doneM.services, "award")).toEqual([
      {
        key: "todo.aemtli|c1|2026-10-11",
        person: `person.${who[1 - from]}`,
        points: 10,
        task: "Müll",
      },
    ]);
  });

  it("ignores what was handed over in an earlier round", async () => {
    const probe = await mount(config, { lists: chore(), now, services: SWAP });
    const from = owner(probe.root);
    const who = ["lina", "ben"];
    const old = offer({
      key: "todo.aemtli|c1|2026-10-04",
      from: `person.${who[from]}`,
      to: `person.${who[1 - from]}`,
      accepted: true,
    });
    const m = await mount(config, {
      lists: chore(),
      now,
      services: SWAP,
      states: {
        ...ledger(who[from], { offers: [old] }),
        ...ledger(who[1 - from], { offers: [old] }),
      },
    });
    expect(owner(m.root)).toBe(from);
  });

  it("works in kid mode, too", async () => {
    const probe = await mount(config, { lists: chore(), now, services: SWAP });
    const from = owner(probe.root);
    const kid = await mount({ ...config, kid_mode: true }, { lists: chore(), now, services: SWAP });
    // switch to whoever has the chore
    (kid.all(".kid-people .kid-av")[from] as HTMLElement).click();
    await kid.settle();
    expect(kid.all(".kid-row .swap-btn.kid")).toHaveLength(1);
    (kid.all(".kid-row .swap-btn")[0] as HTMLElement).click();
    await kid.settle();
    expect(kid.all(".kid-tasks .offer")).toHaveLength(1);
  });

  it("asks for it in the editor only with the rotation on", async () => {
    await import("./editor");
    const ed = document.createElement("family-task-card-editor") as HTMLElement & {
      setConfig(c: unknown): void;
      hass: unknown;
      _schema(): any[];
    };
    ed.hass = { locale: { language: "de" }, states: {} };
    const names = (schema: any[]): string[] =>
      schema.flatMap((s) => (Array.isArray(s.schema) ? names(s.schema) : [s.name]));
    ed.setConfig({ type: "custom:family-task-card", persons: [] });
    expect(names(ed._schema())).not.toContain("chore_swap");
    ed.setConfig({ type: "custom:family-task-card", persons: [], rotation: true });
    expect(names(ed._schema())).toContain("chore_swap");
  });
});
