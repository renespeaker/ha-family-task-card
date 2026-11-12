/**
 * Shorthand in task titles (opt-in, `title_tags`): "Zimmer aufräumen @Lina +20"
 * is Lina's task and worth 20 points, whichever list or app it was typed into –
 * a voice assistant included. Only tags the card understands are taken out of
 * the title: "@" plus a name it knows, and "+" plus a number. An e-mail
 * address, "2+1" or "@Somebody" it doesn't know stay part of the title.
 */

export interface TitleTags {
  /** The title without the tags the card understood. */
  title: string;
  /** The persons (indices) the task is for, in the order they appear; empty: nobody named. */
  persons: number[];
  /** Points for this task, when given. */
  points?: number;
}

/** What a person can be called after "@". */
export interface PersonNames {
  name?: string; // the name in the card config
  person?: string; // person.* entity
  friendly?: string; // the person entity's friendly name
}

const MAX_POINTS = 9999;

/** "@" at the start or after a space, then letters, digits, "_" or "-". */
const AT = /(^|\s)@([\p{L}\p{N}_-]+)/gu;
/** "+" at the start or after a space, then a number that ends the word. */
const PLUS = /(^|\s)\+(\d{1,4})(?=$|[\s.,;:!?)])/g;

const lower = (s: string): string => s.toLocaleLowerCase();

/** A full name and its first word ("Oma Gisela" -> "omagisela", "oma"). */
function nameVariants(raw: string | undefined): string[] {
  const s = (raw ?? "").trim();
  if (!s) return [];
  const words = s.split(/\s+/);
  return [lower(words.join("")), lower(words[0])];
}

/**
 * Every way each person can be named after "@", lower-case: their name (whole
 * or first word), their person entity ("person.lina" -> "lina") and its
 * friendly name.
 */
export function nameKeys(persons: PersonNames[]): Array<Set<string>> {
  return persons.map((p) => {
    const keys = new Set<string>([...nameVariants(p.name), ...nameVariants(p.friendly)]);
    const id = p.person?.split(".")[1];
    if (id) keys.add(lower(id));
    return keys;
  });
}

/** Read the shorthand of one title. */
export function parseTags(summary: string, keys: Array<Set<string>>): TitleTags {
  const persons: number[] = [];
  let points: number | undefined;
  let title = summary.replace(AT, (whole, before: string, token: string) => {
    const t = lower(token);
    const hits = keys.flatMap((k, i) => (k.has(t) ? [i] : []));
    if (!hits.length) return whole; // nobody by that name: leave it in the title
    for (const i of hits) if (!persons.includes(i)) persons.push(i);
    return before;
  });
  title = title.replace(PLUS, (_whole, before: string, n: string) => {
    if (points === undefined) points = Math.min(MAX_POINTS, Number(n));
    return before;
  });
  if (title === summary) return { title, persons };
  title = title
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([.,;:!?])/g, "$1")
    .trim();
  return points === undefined ? { title, persons } : { title, persons, points };
}

/**
 * The shortest tag that names exactly this person: the first word of the
 * name, else the whole name without spaces, else the person entity.
 */
export function tagFor(index: number, names: PersonNames[], shown: string): string | undefined {
  const keys = nameKeys(names);
  const unique = (word: string): boolean =>
    !!word && keys.every((k, i) => i === index || !k.has(lower(word)));
  const words = shown.trim().split(/\s+/);
  const candidates = [words[0], words.join(""), names[index]?.person?.split(".")[1] ?? ""];
  const pick = candidates.find(
    (w) => /^[\p{L}\p{N}_-]+$/u.test(w) && unique(w) && keys[index]?.has(lower(w)),
  );
  return pick ? `@${pick}` : undefined;
}
