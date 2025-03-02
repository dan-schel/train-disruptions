import { assert, describe, expect, it } from "vitest";
import {
  CanonicalLineShape,
  CanonicalLineShapeEdge,
} from "../../../../../server/data/static/line-routes/canonical-line-shape";
import { StationPair } from "../../../../../server/data/static/line-routes/station-pair";

describe("CanonicalLineShape", () => {
  const lineShape = new CanonicalLineShape("the-city", [
    new CanonicalLineShapeEdge("the-city", 1, [
      new StationPair(20, 1),
      new StationPair(21, 1),
      new StationPair(22, 1),
    ]),
    new CanonicalLineShapeEdge(1, 2, [new StationPair(1, 2)]),
    new CanonicalLineShapeEdge(2, 3, [new StationPair(2, 3)]),
    new CanonicalLineShapeEdge(3, 4, [new StationPair(3, 4)]),
    new CanonicalLineShapeEdge(4, 5, [new StationPair(4, 5)]),
    new CanonicalLineShapeEdge(3, 6, [new StationPair(3, 6)]),
    new CanonicalLineShapeEdge(6, 7, [new StationPair(6, 7)]),
  ]);

  it("disallows construction of invalid shapes", () => {
    expect(
      () =>
        new CanonicalLineShape("the-city", [
          new CanonicalLineShapeEdge(1, 2, [new StationPair(1, 2)]),
        ]),
    ).toThrow();
  });

  describe("#validBoundary", () => {
    it("works", () => {
      expect(lineShape.validBoundary("the-city")).toBe(true);
      expect(lineShape.validBoundary(1)).toBe(true);
      expect(lineShape.validBoundary(7)).toBe(true);
      expect(lineShape.validBoundary(8)).toBe(false);
    });

    it("doesn't confuse Route Graph edges for Canoncial Line Shape edges", () => {
      expect(lineShape.validBoundary(20)).toBe(false);
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
      // Ahh... I didn't mean to make this work, but that's neat I guess.
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

describe("CanonicalLineShapeEdge", () => {
  it("disallows construction of invalid edges", () => {
    expect(() => new CanonicalLineShapeEdge(1, 2, [])).toThrow();
    expect(
      () => new CanonicalLineShapeEdge(1, 1, [new StationPair(1, 2)]),
    ).toThrow();
    expect(
      () =>
        new CanonicalLineShapeEdge("the-city", "the-city", [
          new StationPair(1, 2),
        ]),
    ).toThrow();
  });
});
