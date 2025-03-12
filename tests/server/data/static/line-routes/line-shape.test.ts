import { assert, describe, expect, it } from "vitest";
import {
  LineShape,
  LineShapeEdge,
} from "@/server/data/static/line-routes/line-shape";
import { StationPair } from "@/server/data/static/line-routes/station-pair";

describe("LineShape", () => {
  const lineShape = new LineShape("the-city", [
    new LineShapeEdge("the-city", 1, [
      new StationPair(20, 1),
      new StationPair(21, 1),
      new StationPair(22, 1),
    ]),
    new LineShapeEdge(1, 2, [new StationPair(1, 2)]),
    new LineShapeEdge(2, 3, [new StationPair(2, 3)]),
    new LineShapeEdge(3, 4, [new StationPair(3, 4)]),
    new LineShapeEdge(4, 5, [new StationPair(4, 5)]),
    new LineShapeEdge(3, 6, [new StationPair(3, 6)]),
    new LineShapeEdge(6, 7, [new StationPair(6, 7)]),
  ]);

  it("disallows construction of invalid shapes", () => {
    expect(
      () =>
        new LineShape("the-city", [
          new LineShapeEdge(1, 2, [new StationPair(1, 2)]),
        ]),
    ).toThrow();
  });

  describe("#isValidNode", () => {
    it("works", () => {
      expect(lineShape.isValidNode("the-city")).toBe(true);
      expect(lineShape.isValidNode(1)).toBe(true);
      expect(lineShape.isValidNode(7)).toBe(true);
      expect(lineShape.isValidNode(8)).toBe(false);
    });

    it("doesn't confuse Route Graph edges for Line Shape edges", () => {
      expect(lineShape.isValidNode(20)).toBe(false);
    });
  });

  describe("#getRouteGraphPairsBetween", () => {
    it("works", () => {
      expectPairs(lineShape.getRouteGraphPairsBetween("the-city", 3), [
        [20, 1],
        [21, 1],
        [22, 1],
        [1, 2],
        [2, 3],
      ]);

      expectPairs(lineShape.getRouteGraphPairsBetween("the-city", 6), [
        [20, 1],
        [21, 1],
        [22, 1],
        [1, 2],
        [2, 3],
        [3, 6],
      ]);
    });

    it("doesn't expect a specific order", () => {
      expectPairs(lineShape.getRouteGraphPairsBetween(1, 6), [
        [1, 2],
        [2, 3],
        [3, 6],
      ]);

      expectPairs(lineShape.getRouteGraphPairsBetween(6, 1), [
        [1, 2],
        [2, 3],
        [3, 6],
      ]);
    });

    it("can cross branches", () => {
      // TODO: Ahh... I didn't mean to make this work, but that's neat I guess?
      // It's traversing the path between two different branches, like saying
      // there's a disruption between Ararat and Maryborough, and it's
      // translating that to "Ararat-Ballarat" + "Ballarat-Maryborough".
      //
      // If I wanted to prevent that, maybe I could mark some nodes as "not
      // allowed to be the common ancestor"? (Or y'know, just admit that a tree
      // was overkill for this!)
      expectPairs(lineShape.getRouteGraphPairsBetween(7, 5), [
        [7, 6],
        [6, 3],
        [3, 4],
        [4, 5],
      ]);
    });
  });

  function expectPairs(pairs: StationPair[], expected: [number, number][]) {
    const formattedPairs =
      pairs.length === 0
        ? "<none>"
        : pairs.map((x) => `[${x.a}, ${x.b}]`).join(", ");

    for (const [a, b] of expected) {
      assert(
        pairs.some((p) => p.includes(a) && p.includes(b)),
        `Expected pair [${a}, ${b}] not found.\nReceived: ${formattedPairs}`,
      );
    }

    assert(
      pairs.length === expected.length,
      `Found duplicated pairs. Received:\n${formattedPairs}`,
    );
  }
});

describe("LineShapeEdge", () => {
  it("disallows construction of invalid edges", () => {
    expect(() => new LineShapeEdge(1, 2, [])).toThrow();
    expect(() => new LineShapeEdge(1, 1, [new StationPair(1, 2)])).toThrow();
    expect(
      () => new LineShapeEdge("the-city", "the-city", [new StationPair(1, 2)]),
    ).toThrow();
  });
});
