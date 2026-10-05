/**
 * Auto-rotation ("take turns"): chores in shared lists move to the next person
 * every day or week. Everything here is derived from the calendar, so every
 * device (phone, wall tablet, kiosk) shows the same assignment without storing
 * anything.
 *
 * Reopening: the card keeps each rotation chore due on the last day of the
 * current round. A chore whose due date lies before the current round (or that
 * has none yet) belongs to an earlier round, so it is reopened and moved to the
 * end of this one. That way a chore checked off in any app stays done until
 * the round is over.
 */

export type RotationPeriod = "day" | "week";

/** The bits of a todo item the rotation needs. */
export interface RotatableItem {
  uid: string;
  summary: string;
  status: "needs_action" | "completed";
  due?: string;
}

const DAY_MS = 86400000;

/** Local calendar day as a day count since 1970-01-01. Summer-time safe. */
export function dayNumber(d: Date): number {
  return Math.round(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) / DAY_MS);
}

/** Which round we are in. Weeks start on Monday (1970-01-05 was day 4). */
export function roundIndex(now: Date, period: RotationPeriod): number {
  const day = dayNumber(now);
  return period === "day" ? day : Math.floor((day - 4) / 7);
}

const ymd = (day: number): string => new Date(day * DAY_MS).toISOString().slice(0, 10);

/** First and last day of a round, as YYYY-MM-DD. */
export function roundBounds(index: number, period: RotationPeriod): { start: string; end: string } {
  if (period === "day") return { start: ymd(index), end: ymd(index) };
  const first = index * 7 + 4;
  return { start: ymd(first), end: ymd(first + 6) };
}

const mod = (a: number, n: number): number => ((a % n) + n) % n;

/**
 * Who does which chore this round and next. Chores are ordered by title (then
 * uid), so the split stays even and does not jump when a list is reordered;
 * the result maps a chore key to positions in the rotating group.
 */
export function assignChores<T extends RotatableItem>(
  chores: Array<{ key: string; item: T }>,
  groupSize: number,
  round: number,
): Map<string, { now: number; next: number }> {
  const out = new Map<string, { now: number; next: number }>();
  if (groupSize <= 0) return out;
  const ordered = [...chores].sort(
    (a, b) => a.item.summary.localeCompare(b.item.summary) || a.item.uid.localeCompare(b.item.uid),
  );
  ordered.forEach((c, i) => {
    out.set(c.key, { now: mod(i + round, groupSize), next: mod(i + round + 1, groupSize) });
  });
  return out;
}

/**
 * What a chore needs so it belongs to the current round, or null if it already
 * does. A chore from an earlier round (or without a due date yet) is reopened
 * and moved to the round's last day; a due date the user set beyond this round
 * is left alone.
 */
export function roundFix(
  item: RotatableItem,
  bounds: { start: string; end: string },
): { status?: "needs_action"; due_date: string } | null {
  const due = item.due ? item.due.slice(0, 10) : undefined;
  if (due && due >= bounds.start) return null;
  return {
    ...(item.status === "completed" ? { status: "needs_action" as const } : {}),
    due_date: bounds.end,
  };
}
