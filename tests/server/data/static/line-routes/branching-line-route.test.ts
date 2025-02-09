import { describe, expect, it } from "vitest";
import { LineSection } from "../../../../../server/data/line-section";
import { BranchingLineRoute } from "../../../../../server/data/static/line-routes/branching-line-route";

const route = new BranchingLineRoute([1, 2, 3, 4], [5, 6, 7], [8, 9]);

describe("BranchingLineRoute", () => {
  describe("#validateLineSection", () => {
    it("accepts a valid section", () => {
      const section1 = new LineSection(1, 9);
      const section2 = new LineSection(5, 7);
      const section3 = new LineSection(1, 4);
      expect(section1.validate(route, true)).toBe(true);
      expect(section2.validate(route, true)).toBe(true);
      expect(section3.validate(route, true)).toBe(true);
    });

    it("rejects 'the-city' as a station", () => {
      const section = new LineSection("the-city", 4);
      expect(section.validate(route, true)).toBe(false);
    });

    it("rejects sections that cross branches", () => {
      const section = new LineSection(5, 9);
      expect(section.validate(route, true)).toBe(false);
    });
  });
});
