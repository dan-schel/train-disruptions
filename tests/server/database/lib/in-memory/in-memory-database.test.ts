import { describe, expect, it } from "vitest";
import { getDatabase } from "./test-database";
import {
  MUSICAL_INSTRUMENTS,
  MusicalInstrument,
  PIANO_1,
  PIANO_4,
  SYNTH_2,
} from "../test-model";

describe("InMemoryDatabase", () => {
  it("should get items by ID", async () => {
    const db = getDatabase().of(MUSICAL_INSTRUMENTS);
    expect(await db.get(1)).toStrictEqual(PIANO_1);
    expect(await db.get(5)).toStrictEqual(null);
  });

  it("should find items based on a query", async () => {
    const db = getDatabase().of(MUSICAL_INSTRUMENTS);
    expect(await db.find({ where: { type: "piano" } })).toStrictEqual([
      PIANO_1,
      PIANO_4,
    ]);

    expect(
      await db.find({ where: { built: { gt: new Date(2011, 1, 1) } } }),
    ).toStrictEqual([SYNTH_2, PIANO_4]);
  });

  it("should count the number of items it has", async () => {
    const db = getDatabase().of(MUSICAL_INSTRUMENTS);
    expect(await db.count()).toBe(4);
    expect(await db.count({ where: { type: "piano" } })).toBe(2);
  });

  it("should create items", async () => {
    const db = getDatabase().of(MUSICAL_INSTRUMENTS);
    const item = new MusicalInstrument(4, "ukelele", new Date(2019, 5, 12), {
      highest: "A5",
      lowest: "G3",
    });
    await db.create(item);
    expect(await db.get(4)).toStrictEqual(item);
    expect(await db.count()).toBe(5);
  });

  it("should update items", async () => {
    const db = getDatabase().of(MUSICAL_INSTRUMENTS);
    const updated = new MusicalInstrument(1, "piano", new Date(1999, 2, 3), {
      highest: "C7",
      lowest: "A1",
    });
    await db.update(updated);
    expect(await db.get(1)).toStrictEqual(updated);
  });

  it("should delete items", async () => {
    const db = getDatabase().of(MUSICAL_INSTRUMENTS);
    await db.delete(1);
    expect(await db.get(1)).toStrictEqual(null);
    expect(await db.count()).toBe(3);
  });
});
