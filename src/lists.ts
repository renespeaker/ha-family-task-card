/**
 * A person's task lists, as the card and its editor read them: a todo entity
 * id, or { entity, … } with settings for just that list.
 */

/** Which open tasks to show (card-wide, or per list). */
export interface ListFilter {
  hide_undated?: boolean; // hide tasks without a due date
  show_within?: number; // only tasks due within N days (overdue always shown; < 0 = all)
  important?: boolean; // Eisenhower view: every task of this list counts as important
}

export type ListRef = string | ({ entity: string } & ListFilter);

/** The list entries of a person: one, several or none. */
export function listRefs(p: { lists?: ListRef | ListRef[] }): ListRef[] {
  if (!p.lists) return [];
  return (Array.isArray(p.lists) ? p.lists : [p.lists]).filter(Boolean);
}

/** The todo entity of a list entry. */
export const entityOf = (r: ListRef): string => (typeof r === "string" ? r : r.entity);

/** The todo entities of a person. */
export function listsOf(p: { lists?: ListRef | ListRef[] }): string[] {
  return listRefs(p).map(entityOf).filter(Boolean);
}
