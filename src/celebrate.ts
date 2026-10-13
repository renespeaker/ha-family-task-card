/**
 * Celebrate actions: the card runs what Home Assistant's action editor writes,
 * one step after another, as far as a dashboard can – actions and scenes,
 * delays, and state / numeric / time conditions (also and / or / not).
 * Switched-off steps are skipped. Steps only Home Assistant itself can run
 * (device actions, choose, repeat …) are skipped too, while a condition the
 * card can't check counts as not met: better no light show than one at night.
 */

/** {name} and {task} in texts become the person and the task. */
export interface Vars {
  name?: string;
  task?: string;
}

/** One step as the HA action editor writes it (or the older `service:`). */
export interface CelebrateAction {
  action?: string; // "domain.service", e.g. "light.turn_on"
  service?: string; // older spelling of `action`
  data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  enabled?: boolean;
  [key: string]: unknown; // delay, condition, scene, stop …
}

interface StateObj {
  state: string;
  last_changed?: string;
  attributes?: Record<string, unknown>;
}

/** What the steps need from Home Assistant and the clock. */
export interface Runner {
  state: (entity: string) => StateObj | undefined;
  call: (
    domain: string,
    service: string,
    data: Record<string, unknown>,
    target?: Record<string, unknown>,
  ) => Promise<unknown>;
  wait: (ms: number) => Promise<void>;
  now: () => Date;
}

/** Fill {name} and {task} into every text of a value. */
export function fill(value: unknown, vars: Vars): unknown {
  if (typeof value === "string") {
    return value.replace(/\{name\}/g, vars.name ?? "").replace(/\{task\}/g, vars.task ?? "");
  }
  if (Array.isArray(value)) return value.map((v) => fill(v, vars));
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = fill(v, vars);
    return out;
  }
  return value;
}

/**
 * A delay in ms: "00:00:05" (also "HH:MM"), 5 (seconds) or { seconds: 5 }
 * as the action editor writes it. Undefined if unreadable, e.g. a template.
 */
export function delayMs(v: unknown): number | undefined {
  if (typeof v === "number") return v >= 0 ? v * 1000 : undefined;
  if (typeof v === "string") {
    const s = v.trim();
    if (/^\d+(\.\d+)?$/.test(s)) return Number(s) * 1000;
    const m = /^(\d+):(\d+)(?::(\d+(?:\.\d+)?))?$/.exec(s);
    if (!m) return undefined;
    return ((Number(m[1]) * 60 + Number(m[2])) * 60 + Number(m[3] ?? 0)) * 1000;
  }
  if (v && typeof v === "object") {
    const d = v as Record<string, unknown>;
    const n = (k: string) => Number(d[k] ?? 0) || 0;
    const seconds = ((n("days") * 24 + n("hours")) * 60 + n("minutes")) * 60 + n("seconds");
    return seconds * 1000 + n("milliseconds");
  }
  return undefined;
}

const asList = (v: unknown): string[] =>
  Array.isArray(v) ? v.map(String) : v === undefined || v === null ? [] : [String(v)];

const WEEKDAYS = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

/** Seconds since midnight of "HH:MM(:SS)" or a date-time; undefined if neither. */
function timeOfDay(text: string | undefined): number | undefined {
  if (!text) return undefined;
  const m = /^(\d{1,2}):(\d{2})(?::(\d{2}))?$/.exec(text.trim());
  if (m) return Number(m[1]) * 3600 + Number(m[2]) * 60 + Number(m[3] ?? 0);
  const d = new Date(text);
  if (isNaN(d.getTime()) || !/\d{4}-\d{2}-\d{2}/.test(text)) return undefined;
  return d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
}

/** The sub-conditions of and / or / not, also in their short form. */
function subConditions(c: Record<string, unknown>, kind: string): Record<string, unknown>[] {
  const raw = c.condition === kind ? c.conditions : c[kind];
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  // A switched-off condition counts as if it wasn't there.
  return list.filter(
    (s): s is Record<string, unknown> => !!s && typeof s === "object" && s.enabled !== false,
  );
}

/** Does a condition hold right now? One the card can't check counts as not met. */
export function conditionMet(
  c: Record<string, unknown>,
  io: Pick<Runner, "state" | "now">,
): boolean {
  const kind =
    typeof c.condition === "string" ? c.condition : ["and", "or", "not"].find((k) => k in c);
  const value = (entity: string, attribute: unknown): unknown => {
    const s = io.state(entity);
    if (!s) return undefined;
    return typeof attribute === "string" ? s.attributes?.[attribute] : s.state;
  };
  switch (kind) {
    case "and":
      return subConditions(c, "and").every((s) => conditionMet(s, io));
    case "or":
      return subConditions(c, "or").some((s) => conditionMet(s, io));
    case "not":
      return !subConditions(c, "not").some((s) => conditionMet(s, io));
    case "state": {
      const entities = asList(c.entity_id);
      const wanted = asList(c.state);
      if (!entities.length || !wanted.length) return false;
      const forMs = c.for === undefined ? 0 : delayMs(c.for);
      if (forMs === undefined) return false;
      const ok = (e: string) => {
        const v = value(e, c.attribute);
        if (v === undefined || !wanted.includes(String(v))) return false;
        if (!forMs) return true;
        const since = Date.parse(io.state(e)?.last_changed ?? "");
        return !isNaN(since) && io.now().getTime() - since >= forMs;
      };
      return c.match === "any" ? entities.some(ok) : entities.every(ok);
    }
    case "numeric_state": {
      const entities = asList(c.entity_id);
      if (!entities.length || c.value_template !== undefined) return false;
      // a limit may be a number or an entity holding one (input_number …)
      const limit = (l: unknown): number | undefined => {
        if (l === undefined || l === null) return undefined;
        if (typeof l === "string" && l.includes(".") && isNaN(Number(l)))
          return Number(io.state(l)?.state);
        return Number(l);
      };
      const above = limit(c.above);
      const below = limit(c.below);
      if (above === undefined && below === undefined) return false;
      return entities.every((e) => {
        const n = Number(value(e, c.attribute));
        if (value(e, c.attribute) === undefined || isNaN(n)) return false;
        if (above !== undefined && !(n > above)) return false;
        if (below !== undefined && !(n < below)) return false;
        return true;
      });
    }
    case "time": {
      const now = io.now();
      const days = asList(c.weekday);
      if (days.length && !days.includes(WEEKDAYS[now.getDay()])) return false;
      // after / before: "HH:MM(:SS)" or an entity holding a time
      const at = (l: unknown): number | undefined | null => {
        if (l === undefined || l === null) return null; // not set
        const s = String(l);
        return timeOfDay(/^[a-z_]+\.\w+$/.test(s) ? io.state(s)?.state : s);
      };
      const after = at(c.after);
      const before = at(c.before);
      if (after === undefined || before === undefined) return false; // unreadable
      const t = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
      if (after !== null && before !== null && after > before) {
        return t >= after || t < before; // e.g. 22:00 – 06:00, over midnight
      }
      return (after === null || t >= after) && (before === null || t < before);
    }
    default:
      return false;
  }
}

/** Is this step a condition (also the short and / or / not form)? */
const isCondition = (a: Record<string, unknown>): boolean =>
  ["condition", "and", "or", "not"].some((k) => k in a);

/** Call a service; a failing one does not stop the rest. */
async function tryCall(io: Runner, ...args: Parameters<Runner["call"]>): Promise<void> {
  try {
    await io.call(...args);
  } catch {
    // e.g. a speaker that is off – the light show goes on
  }
}

/**
 * Run the steps one after another. A failing call does not stop the rest;
 * an unmet condition or `stop` ends the run.
 */
export async function runActions(actions: unknown, vars: Vars, io: Runner): Promise<void> {
  if (!Array.isArray(actions)) return;
  for (const raw of actions) {
    if (!raw || typeof raw !== "object") continue;
    const a = raw as CelebrateAction;
    if (a.enabled === false) continue;
    if (isCondition(a)) {
      if (!conditionMet(a, io)) return;
      continue;
    }
    if ("delay" in a) {
      const ms = delayMs(a.delay);
      if (ms) await io.wait(ms);
      continue;
    }
    if ("stop" in a) return;
    const svc = a.action ?? a.service;
    if (typeof svc === "string" && svc.includes(".")) {
      const [domain, ...rest] = svc.split(".");
      const data = fill(a.data ?? {}, vars) as Record<string, unknown>;
      const target = a.target ? (fill(a.target, vars) as Record<string, unknown>) : undefined;
      await tryCall(io, domain, rest.join("."), data, target);
      continue;
    }
    if (typeof a.scene === "string") {
      await tryCall(io, "scene", "turn_on", { entity_id: a.scene });
    }
    // device actions, choose, repeat … need Home Assistant itself: skipped
  }
}
