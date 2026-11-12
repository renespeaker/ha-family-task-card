import { describe, it, expect } from "vitest";
import { nameKeys, parseTags, tagFor, type PersonNames } from "./tags";

const family: PersonNames[] = [
  { name: "Lina", person: "person.lina" },
  { name: "Ben" },
  { name: "Oma Gisela" },
  { person: "person.papa", friendly: "Papa Peter" },
];
const keys = nameKeys(family);

describe("shorthand in titles", () => {
  it("names a person by name, first word, person entity or friendly name", () => {
    expect(parseTags("Zimmer @Lina", keys).persons).toEqual([0]);
    expect(parseTags("Zimmer @lina", keys).persons).toEqual([0]); // any case
    expect(parseTags("Kuchen @Oma", keys).persons).toEqual([2]);
    expect(parseTags("Kuchen @OmaGisela", keys).persons).toEqual([2]);
    expect(parseTags("Rasen @papa", keys).persons).toEqual([3]); // person.papa
    expect(parseTags("Rasen @Peter", keys).persons).toEqual([]); // not a first word
    expect(parseTags("Rasen @PapaPeter", keys).persons).toEqual([3]);
  });

  it("takes the tags out of the title and reads the points", () => {
    expect(parseTags("Zimmer aufräumen @Lina +20", keys)).toEqual({
      title: "Zimmer aufräumen",
      persons: [0],
      points: 20,
    });
    expect(parseTags("+5 Tisch decken", keys)).toEqual({
      title: "Tisch decken",
      persons: [],
      points: 5,
    });
    expect(parseTags("Zimmer @Lina, bitte", keys).title).toBe("Zimmer, bitte");
    expect(parseTags("!Steuer @Papa +30", keys).title).toBe("!Steuer"); // "!" stays
  });

  it("lists several persons once each, in order", () => {
    expect(parseTags("Garage @Ben @Lina @ben", keys)).toEqual({
      title: "Garage",
      persons: [1, 0],
    });
  });

  it("leaves alone what is not a tag", () => {
    for (const title of [
      "Mail an info@lina.de", // an address, even if it holds a name
      "Pizza 2+1 holen",
      "Frage @Nachbar",
      "Bonus +12345",
      "Zimmer +20Punkte",
    ]) {
      expect(parseTags(title, keys)).toEqual({ title, persons: [] });
    }
  });

  it("takes the first number when there are several", () => {
    expect(parseTags("Bad +30 +5", keys)).toEqual({ title: "Bad", persons: [], points: 30 });
  });

  it("writes the shortest tag that names just this person", () => {
    expect(tagFor(0, family, "Lina")).toBe("@Lina");
    expect(tagFor(2, family, "Oma Gisela")).toBe("@Oma");
    const twoAnnas: PersonNames[] = [{ name: "Anna Lena" }, { name: "Anna Maria" }];
    expect(tagFor(1, twoAnnas, "Anna Maria")).toBe("@AnnaMaria");
    expect(tagFor(0, [{}], "Person 1")).toBeUndefined();
  });
});
