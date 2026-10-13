/* Celebrate actions: what the HA action editor writes, run step by step. */
import { describe, it, expect } from "vitest";
import { conditionMet, delayMs, runActions, type Runner } from "./celebrate";

type States = Record<
  string,
  { state: string; last_changed?: string; attributes?: Record<string, unknown> }
>;

/** Monday 12 Oct 2026, 18:30 local time. */
const MONDAY_EVENING = new Date(2026, 9, 12, 18, 30);

function fake(states: States = {}, now = MONDAY_EVENING) {
  const log: string[] = [];
  const io: Runner = {
    state: (e) => states[e],
    call: async (domain, service, data, target) => {
      if (service === "broken") throw new Error("speaker is off");
      log.push(`${domain}.${service} ${JSON.stringify(target ? { ...data, target } : data)}`);
    },
    wait: async (ms) => {
      log.push(`wait ${ms}`);
    },
    now: () => now,
  };
  return { io, log };
}

describe("delays", () => {
  it("reads what the action editor writes", () => {
    expect(delayMs({ hours: 0, minutes: 1, seconds: 5, milliseconds: 0 })).toBe(65_000);
    expect(delayMs("00:00:05")).toBe(5000);
    expect(delayMs("01:30")).toBe(5_400_000); // HH:MM
    expect(delayMs(2.5)).toBe(2500);
    expect(delayMs("3")).toBe(3000);
    expect(delayMs("{{ states('input_number.wait') }}")).toBeUndefined();
  });
});

describe("running the steps", () => {
  it("runs them in order and waits where asked", async () => {
    const { io, log } = fake();
    await runActions(
      [
        { action: "light.turn_on", target: { entity_id: "light.kids" } },
        { delay: { seconds: 5 } },
        { service: "light.turn_off", data: { entity_id: "light.kids" } },
      ],
      {},
      io,
    );
    expect(log).toEqual([
      'light.turn_on {"target":{"entity_id":"light.kids"}}',
      "wait 5000",
      'light.turn_off {"entity_id":"light.kids"}',
    ]);
  });

  it("fills in the person and the task", async () => {
    const { io, log } = fake();
    await runActions(
      [{ action: "notify.mama", data: { message: "{name}: {task} ✓", data: { tag: "{name}" } } }],
      { name: "Lina", task: "Zimmer" },
      io,
    );
    expect(log).toEqual(['notify.mama {"message":"Lina: Zimmer ✓","data":{"tag":"Lina"}}']);
  });

  it("skips switched-off steps", async () => {
    const { io, log } = fake();
    await runActions(
      [
        { action: "light.turn_on", enabled: false },
        { delay: 5, enabled: false },
        { condition: "state", entity_id: "input_boolean.x", state: "on", enabled: false },
        { action: "tts.speak" },
      ],
      {},
      io,
    );
    expect(log).toEqual(["tts.speak {}"]);
  });

  it("stops at a condition that is not met", async () => {
    const quiet = { "input_boolean.quiet": { state: "on" } };
    const steps = [
      { action: "light.turn_on" },
      { condition: "state", entity_id: "input_boolean.quiet", state: "off" },
      { action: "tts.speak" },
    ];
    const night = fake(quiet);
    await runActions(steps, {}, night.io);
    expect(night.log).toEqual(["light.turn_on {}"]);
    const day = fake({ "input_boolean.quiet": { state: "off" } });
    await runActions(steps, {}, day.io);
    expect(day.log).toEqual(["light.turn_on {}", "tts.speak {}"]);
  });

  it("goes on after a call that fails", async () => {
    const { io, log } = fake();
    await runActions([{ action: "media_player.broken" }, { action: "light.turn_on" }], {}, io);
    expect(log).toEqual(["light.turn_on {}"]);
  });

  it("activates a scene and ends at stop", async () => {
    const { io, log } = fake();
    await runActions(
      [{ scene: "scene.party" }, { stop: "done" }, { action: "light.turn_on" }],
      {},
      io,
    );
    expect(log).toEqual(['scene.turn_on {"entity_id":"scene.party"}']);
  });

  it("skips steps only Home Assistant itself can run", async () => {
    const { io, log } = fake();
    await runActions(
      [
        { device_id: "abc", domain: "light", entity_id: "light.kids", type: "turn_on" },
        { choose: [{ conditions: [], sequence: [] }] },
        { action: "light.turn_on" },
      ],
      {},
      io,
    );
    expect(log).toEqual(["light.turn_on {}"]);
  });
});

describe("conditions", () => {
  const met = (c: Record<string, unknown>, states: States = {}, now = MONDAY_EVENING) =>
    conditionMet(c, fake(states, now).io);

  it("checks states, also several and of an attribute", () => {
    const states: States = {
      "person.lina": { state: "home" },
      "person.ben": { state: "not_home" },
      "light.kids": { state: "on", attributes: { color_mode: "rgb" } },
    };
    const home = { condition: "state", state: ["home", "Garten"] };
    expect(met({ ...home, entity_id: "person.lina" }, states)).toBe(true);
    expect(met({ ...home, entity_id: ["person.lina", "person.ben"] }, states)).toBe(false);
    expect(met({ ...home, entity_id: ["person.lina", "person.ben"], match: "any" }, states)).toBe(
      true,
    );
    expect(
      met(
        { condition: "state", entity_id: "light.kids", attribute: "color_mode", state: "rgb" },
        states,
      ),
    ).toBe(true);
    expect(met({ condition: "state", entity_id: "person.nobody", state: "home" }, states)).toBe(
      false,
    );
  });

  it("checks how long a state has lasted", () => {
    const states: States = {
      "binary_sensor.door": { state: "off", last_changed: "2026-10-12T16:20:00.000Z" }, // 18:20
    };
    const closed = { condition: "state", entity_id: "binary_sensor.door", state: "off" };
    expect(met({ ...closed, for: { minutes: 5 } }, states)).toBe(true);
    expect(met({ ...closed, for: "00:30:00" }, states)).toBe(false);
  });

  it("checks numbers against fixed limits and helpers", () => {
    const states: States = {
      "sensor.lux": { state: "40" },
      "input_number.dark": { state: "50" },
    };
    const lux = { condition: "numeric_state", entity_id: "sensor.lux" };
    expect(met({ ...lux, below: 50 }, states)).toBe(true);
    expect(met({ ...lux, above: 40 }, states)).toBe(false);
    expect(met({ ...lux, above: 10, below: "input_number.dark" }, states)).toBe(true);
    expect(met({ ...lux }, states)).toBe(false);
  });

  it("checks the time of day and the weekday", () => {
    const evening = { condition: "time", after: "07:00", before: "20:00" };
    expect(met(evening)).toBe(true);
    expect(met(evening, {}, new Date(2026, 9, 12, 21, 0))).toBe(false);
    const night = { condition: "time", after: "22:00:00", before: "06:00:00" };
    expect(met(night, {}, new Date(2026, 9, 12, 23, 30))).toBe(true);
    expect(met(night, {}, new Date(2026, 9, 13, 5, 59))).toBe(true);
    expect(met(night)).toBe(false);
    expect(met({ condition: "time", weekday: ["sat", "sun"] })).toBe(false);
    expect(met({ condition: "time", weekday: "mon" })).toBe(true);
    const wake = { "input_datetime.quiet_from": { state: "19:00:00" } };
    expect(met({ condition: "time", before: "input_datetime.quiet_from" }, wake)).toBe(true);
  });

  it("combines conditions with and / or / not, also written short", () => {
    const states: States = {
      "input_boolean.a": { state: "on" },
      "input_boolean.b": { state: "off" },
    };
    const a = { condition: "state", entity_id: "input_boolean.a", state: "on" };
    const b = { condition: "state", entity_id: "input_boolean.b", state: "on" };
    expect(met({ condition: "and", conditions: [a, b] }, states)).toBe(false);
    expect(met({ condition: "or", conditions: [a, b] }, states)).toBe(true);
    expect(met({ condition: "not", conditions: [b] }, states)).toBe(true);
    expect(met({ or: [b, a] }, states)).toBe(true);
    // a switched-off part counts as if it wasn't there
    expect(met({ and: [a, { ...b, enabled: false }] }, states)).toBe(true);
  });

  it("counts a condition it can't check as not met", () => {
    expect(met({ condition: "template", value_template: "{{ true }}" })).toBe(false);
    expect(met({ condition: "device", device_id: "abc", type: "is_on" })).toBe(false);
    expect(met({ condition: "zone", entity_id: "person.lina", zone: "zone.home" })).toBe(false);
  });
});
