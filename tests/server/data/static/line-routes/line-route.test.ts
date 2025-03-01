import { assert, describe, expect, it } from "vitest";
import { LineRoute } from "../../../../../server/data/static/line-routes/line-route";
import { LineRoutePath } from "../../../../../server/data/static/line-routes/line-route-path";
import {
  LineSection,
  LineSectionBoundary,
} from "../../../../../server/data/line-section";
import { StationPair } from "../../../../../server/data/static/line-routes/station-pair";

describe("LineRoute", () => {
  const simpleRoute = new LineRoute([new LineRoutePath([], [1, 2, 3, 4])]);
  const loopRoute = new LineRoute([
    new LineRoutePath([1, 2, 3], [4, 5, 6]),
    new LineRoutePath([1], [4, 5, 6]),
  ]);
  const expressOptionRoute = new LineRoute([
    new LineRoutePath([], [1, 2, 3, 4, 5, 6]),
    new LineRoutePath([], [1, 2, 5, 6]),
  ]);

  // TODO: This route is NOT handled well by #getEdgesInSection (see commented
  // out test below), and will need to be! :(
  //
  // Will need some sort of additional context to know that 1-2-3-4 are in
  // sequence, despite being disconnected in the graph.
  const regionalRoute = new LineRoute([
    new LineRoutePath([], [1, 4, 5, 6]),
    new LineRoutePath([], [2, 4, 5, 6]),
    new LineRoutePath([], [3, 4, 5, 6]),
  ]);

  // TODO: This route is NOT handled well by #getEdgesInSection (see commented
  // out test below). Good news is that I don't think we have anything this
  // complex in reality.
  const complexRoute = new LineRoute([
    new LineRoutePath([], [1, 2, 3, 4, 5, 6]),
    new LineRoutePath([], [1, 4, 6, 7]),
  ]);

  it("should throw an error if no paths are provided", () => {
    expect(() => new LineRoute([])).toThrow();
  });

  describe("#edges", () => {
    it("should return correct pairs", () => {
      expectPairs(simpleRoute.edges, [
        [1, 2],
        [2, 3],
        [3, 4],
      ]);
      expectPairs(loopRoute.edges, [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [1, 4],
      ]);
      expectPairs(expressOptionRoute.edges, [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [2, 5],
      ]);
      expectPairs(regionalRoute.edges, [
        [1, 4],
        [2, 4],
        [3, 4],
        [4, 5],
        [5, 6],
      ]);
      expectPairs(complexRoute.edges, [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [1, 4],
        [4, 6],
        [6, 7],
      ]);
    });
  });

  describe("#isValidSection", () => {
    it("returns the correct value", () => {
      expect(simpleRoute.isValidSection(section("the-city", 3))).toBe(false);
      expect(simpleRoute.isValidSection(section(2, 3))).toBe(true);
      expect(simpleRoute.isValidSection(section(4, 3))).toBe(true);

      expect(loopRoute.isValidSection(section(4, 6))).toBe(true);
      expect(loopRoute.isValidSection(section("the-city", 6))).toBe(true);
      expect(loopRoute.isValidSection(section(6, "the-city"))).toBe(true);
      expect(loopRoute.isValidSection(section(2, 6))).toBe(false);
      expect(loopRoute.isValidSection(section("the-city", 8))).toBe(false);
    });
  });

  describe("#getEdgesInSection", () => {
    it("returns the correct pairs", () => {
      expectPairs(simpleRoute.getEdgesInSection(section(2, 3)), [[2, 3]]);

      expectPairs(loopRoute.getEdgesInSection(section("the-city", 5)), [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [1, 4],
      ]);
      expectPairs(loopRoute.getEdgesInSection(section(4, 6)), [
        [4, 5],
        [5, 6],
      ]);

      expectPairs(expressOptionRoute.getEdgesInSection(section(1, 6)), [
        [1, 2],
        [2, 3],
        [3, 4],
        [4, 5],
        [5, 6],
        [2, 5],
      ]);
      expectPairs(expressOptionRoute.getEdgesInSection(section(3, 6)), [
        [3, 4],
        [4, 5],
        [5, 6],
      ]);
    });

    it("throws for invalid paths", () => {
      expect(() =>
        loopRoute.getEdgesInSection(section("the-city", 8)),
      ).toThrow();
      expect(() => loopRoute.getEdgesInSection(section(2, 5))).toThrow();
      expect(() =>
        simpleRoute.getEdgesInSection(section("the-city", 4)),
      ).toThrow();
    });

    // it("handles regional routes", () => {
    //   expectPairs(regionalRoute.getEdgesInSection(section(4, 6)), [
    //     [4, 5],
    //     [5, 6],
    //   ]);
    //   expectPairs(regionalRoute.getEdgesInSection(section(1, 6)), [
    //     [1, 4],
    //     [2, 4],
    //     [3, 4],
    //     [4, 5],
    //     [5, 6],
    //   ]);
    // });

    // it("handles complex routes", () => {
    //   expectPairs(complexRoute.getEdgesInSection(section(1, 5)), [
    //     [1, 2],
    //     [2, 3],
    //     [3, 4],
    //     [4, 5],
    //     [1, 4],
    //   ]);
    //   expectPairs(complexRoute.getEdgesInSection(section(4, 7)), [
    //     [4, 6],
    //     [6, 7],
    //     [4, 5],
    //     [5, 6],
    //   ]);
    // });
  });

  function section(a: LineSectionBoundary, b: LineSectionBoundary) {
    return new LineSection(1, a, b);
  }

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
