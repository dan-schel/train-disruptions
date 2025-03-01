import { describe, expect, it } from "vitest";
import { LineRoute } from "../../../../../server/data/static/line-routes/line-route";
import { LineRoutePath } from "../../../../../server/data/static/line-routes/line-route-path";
import {
  LineSection,
  LineSectionBoundary,
} from "../../../../../server/data/line-section";
import { StationPair } from "../../../../../server/data/static/line-routes/station-pair";

describe("LineRoute", () => {
  const lineRoute1 = new LineRoute([
    new LineRoutePath([1, 2, 3], [4, 5, 6]),
    new LineRoutePath([1], [4, 6, 7]),
  ]);
  const lineRoute2 = new LineRoute([new LineRoutePath([], [1, 2, 3, 4])]);

  function section(a: LineSectionBoundary, b: LineSectionBoundary) {
    return new LineSection(1, a, b);
  }

  function expectPair(pairs: StationPair[], a: number, b: number) {
    expect(pairs.some((p) => p.includes(a) && p.includes(b))).toBe(true);
  }

  it("should throw an error if no paths are provided", () => {
    expect(() => new LineRoute([])).toThrow();
  });

  describe("#edges", () => {
    it("should return correct pairs", () => {
      const pairs1 = lineRoute1.edges;
      expectPair(pairs1, 1, 2);
      expectPair(pairs1, 2, 3);
      expectPair(pairs1, 3, 4);
      expectPair(pairs1, 4, 5);
      expectPair(pairs1, 5, 6);
      expectPair(pairs1, 1, 4);
      expectPair(pairs1, 4, 6);
      expectPair(pairs1, 6, 7);

      const pairs2 = lineRoute2.edges;
      expectPair(pairs2, 1, 2);
      expectPair(pairs2, 2, 3);
      expectPair(pairs2, 3, 4);
    });

    it("should not return duplicate pairs", () => {
      const pairs1 = lineRoute1.edges;
      expect(pairs1.length).toBe(8);

      const pairs2 = lineRoute2.edges;
      expect(pairs2.length).toBe(3);
    });
  });

  describe("#isValidSection", () => {
    it("returns the correct value", () => {
      expect(lineRoute1.isValidSection(section(4, 6))).toBe(true);
      expect(lineRoute1.isValidSection(section("the-city", 6))).toBe(true);
      expect(lineRoute1.isValidSection(section(6, "the-city"))).toBe(true);
      expect(lineRoute1.isValidSection(section(2, 6))).toBe(false);
      expect(lineRoute1.isValidSection(section("the-city", 8))).toBe(false);

      expect(lineRoute2.isValidSection(section("the-city", 3))).toBe(false);
      expect(lineRoute2.isValidSection(section(2, 3))).toBe(true);
      expect(lineRoute2.isValidSection(section(4, 3))).toBe(true);
    });
  });

  describe("#getEdgesInSection", () => {
    it("returns the correct pairs", () => {
      const pairsSection1 = lineRoute1.getEdgesInSection(
        section("the-city", 5),
      );
      expect(pairsSection1.length).toBe(5);
      expectPair(pairsSection1, 1, 2);
      expectPair(pairsSection1, 2, 3);
      expectPair(pairsSection1, 3, 4);
      expectPair(pairsSection1, 1, 4);
      expectPair(pairsSection1, 4, 5); // Ideally

      const pairsSection2 = lineRoute1.getEdgesInSection(section(4, 7));
      expect(pairsSection2.length).toBe(4);
      expectPair(pairsSection2, 4, 6);
      expectPair(pairsSection2, 6, 7);
      expectPair(pairsSection2, 4, 5); // Ideally
      expectPair(pairsSection2, 5, 6); // Ideally

      const pairsSection3 = lineRoute2.getEdgesInSection(section(2, 3));
      expect(pairsSection3.length).toBe(1);
      expectPair(pairsSection3, 2, 3);
    });

    // it throws for invalid paths
    it("throws for invalid paths", () => {
      expect(() =>
        lineRoute1.getEdgesInSection(section("the-city", 8)),
      ).toThrow();
      expect(() => lineRoute1.getEdgesInSection(section(2, 5))).toThrow();
      expect(() =>
        lineRoute2.getEdgesInSection(section("the-city", 4)),
      ).toThrow();
    });
  });
});
