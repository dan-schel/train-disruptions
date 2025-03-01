import { describe, expect, it } from "vitest";
import { LineRoutePath } from "../../../../../server/data/static/line-routes/line-route-path";
import {
  LineSection,
  LineSectionBoundary,
} from "../../../../../server/data/line-section";

describe("LineRoutePath", () => {
  const route1 = new LineRoutePath([1, 2, 3], [4, 5, 6]);
  const route2 = new LineRoutePath([1], [2, 3, 4, 5, 6]);
  const route3 = new LineRoutePath([], [1, 2, 3, 4, 5, 6]);

  function section(a: LineSectionBoundary, b: LineSectionBoundary) {
    return new LineSection(1, a, b);
  }

  it("should throw an error if not enough stations are given", () => {
    expect(() => new LineRoutePath([], [])).toThrow();
    expect(() => new LineRoutePath([], [1])).toThrow();
    expect(() => new LineRoutePath([], [1, 2])).not.toThrow();
    expect(() => new LineRoutePath([1], [])).toThrow();
    expect(() => new LineRoutePath([1], [2])).not.toThrow();
    expect(() => new LineRoutePath([1, 2], [])).toThrow();
    expect(() => new LineRoutePath([1, 2], [3])).not.toThrow();
    expect(() => new LineRoutePath([1, 2, 3, 4, 5], [])).toThrow();
  });

  describe("#includesBoundary", () => {
    it("matches 'the-city' if city stations are present", () => {
      expect(route1.includesBoundary("the-city")).toBe(true);
      expect(route2.includesBoundary("the-city")).toBe(true);
      expect(route3.includesBoundary("the-city")).toBe(false);
    });

    it("doesn't match explicit stations where 'the-city' should be used", () => {
      expect(route1.includesBoundary(3)).toBe(false);
      expect(route2.includesBoundary(1)).toBe(false);
    });

    it("matches explicit stations outside 'the-city' stations", () => {
      expect(route1.includesBoundary(4)).toBe(true);
      expect(route2.includesBoundary(4)).toBe(true);
      expect(route3.includesBoundary(4)).toBe(true);
    });
  });

  describe("#trimToSection", () => {
    it("returns the correct values", () => {
      expect(route1.trimToSection(section(4, 6))).toEqual([4, 5, 6]);
      expect(route1.trimToSection(section("the-city", 4))).toEqual([
        1, 2, 3, 4,
      ]);
      expect(route2.trimToSection(section(3, 5))).toEqual([3, 4, 5]);
      expect(route3.trimToSection(section(1, 6))).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it("follows the order of the given boundaries", () => {
      expect(route1.trimToSection(section(6, 4))).toEqual([6, 5, 4]);
      expect(route1.trimToSection(section(4, "the-city"))).toEqual([
        4, 3, 2, 1,
      ]);
      expect(route2.trimToSection(section(5, "the-city"))).toEqual([
        5, 4, 3, 2, 1,
      ]);
    });

    it("throws an error if the section is invalid", () => {
      expect(() => route1.trimToSection(section(1, 4))).toThrow();
      expect(() => route2.trimToSection(section("the-city", 1))).toThrow();
      expect(() =>
        route2.trimToSection(section("the-city", "the-city")),
      ).toThrow();
      expect(() => route3.trimToSection(section(1, 7))).toThrow();
      expect(() => route3.trimToSection(section(2, 2))).toThrow();
    });
  });
});
