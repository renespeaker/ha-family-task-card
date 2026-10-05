/* Calendar maths of the auto-rotation. Runs in Europe/Berlin (vitest.config). */
import { describe, it, expect } from "vitest";
import { assignChores, roundBounds, roundFix, roundIndex, type RotatableItem } from "./rotation";

const chore = (uid: string, summary: string, extra: Partial<RotatableItem> = {}) => ({
  key: uid,
  item: { uid, summary, status: "needs_action" as const, ...extra },
});

describe("rounds", () => {
  it("runs a weekly round from Monday to Sunday", () => {
    const wed = roundIndex(new Date(2026, 9, 7, 12), "week");
    expect(roundBounds(wed, "week")).toEqual({ start: "2026-10-05", end: "2026-10-11" });
    expect(roundIndex(new Date(2026, 9, 5, 0, 1), "week")).toBe(wed);
    expect(roundIndex(new Date(2026, 9, 11, 23, 59), "week")).toBe(wed);
    expect(roundIndex(new Date(2026, 9, 12, 0, 1), "week")).toBe(wed + 1);
  });

  it("keeps the week whole when the clocks go back", () => {
    // 25 Oct 2026: Berlin leaves summer time, that Sunday has 25 hours.
    const mon = roundIndex(new Date(2026, 9, 19, 0, 1), "week");
    expect(roundIndex(new Date(2026, 9, 25, 23, 59), "week")).toBe(mon);
    expect(roundBounds(mon, "week")).toEqual({ start: "2026-10-19", end: "2026-10-25" });
  });

  it("runs a daily round for one calendar day", () => {
    const d = roundIndex(new Date(2026, 2, 29, 12), "day"); // summer time starts that day
    expect(roundBounds(d, "day")).toEqual({ start: "2026-03-29", end: "2026-03-29" });
    expect(roundIndex(new Date(2026, 2, 30, 0, 1), "day")).toBe(d + 1);
  });
});

describe("assigning chores", () => {
  const chores = [chore("a", "Müll"), chore("b", "Spülmaschine"), chore("c", "Tisch decken")];

  it("gives everyone one chore and moves each on by one", () => {
    const now = assignChores(chores, 3, 10);
    expect(new Set([...now.values()].map((a) => a.now))).toEqual(new Set([0, 1, 2]));
    const later = assignChores(chores, 3, 11);
    for (const [key, a] of now) expect(later.get(key)!.now).toBe(a.next);
  });

  it("does not care about the order of the list", () => {
    const shuffled = [chores[2], chores[0], chores[1]];
    expect(assignChores(shuffled, 3, 4)).toEqual(assignChores(chores, 3, 4));
  });

  it("assigns nothing without people", () => {
    expect(assignChores(chores, 0, 1).size).toBe(0);
  });
});

describe("keeping chores in the round", () => {
  const week = { start: "2026-10-05", end: "2026-10-11" };

  it("reopens a chore from last week and moves it to this Sunday", () => {
    const done = { uid: "a", summary: "Müll", status: "completed" as const, due: "2026-10-04" };
    expect(roundFix(done, week)).toEqual({ status: "needs_action", due_date: "2026-10-11" });
  });

  it("moves an open chore along without touching its status", () => {
    expect(roundFix({ uid: "a", summary: "Müll", status: "needs_action" }, week)).toEqual({
      due_date: "2026-10-11",
    });
  });

  it("leaves a chore of this round alone, done or not", () => {
    const done = { uid: "a", summary: "Müll", status: "completed" as const, due: "2026-10-11" };
    expect(roundFix(done, week)).toBeNull();
    expect(roundFix({ ...done, due: "2026-10-11T00:00:00+02:00" }, week)).toBeNull();
  });

  it("leaves a due date set beyond this round alone", () => {
    const later = {
      uid: "a",
      summary: "Fenster",
      status: "needs_action" as const,
      due: "2026-11-01",
    };
    expect(roundFix(later, week)).toBeNull();
  });
});
