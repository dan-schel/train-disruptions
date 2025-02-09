import { describe, expect, it } from "vitest";
import { LineSection } from "../../../../../server/data/line-section";
import { DualPathLineRoute } from "../../../../../server/data/static/line-routes/dual-path-line-route";

const route = new DualPathLineRoute([1, 2, 3], [4, 5, 6], [7, 8], [9]);

describe("DualPathLineRoute", () => {
  describe("#validateLineSection", () => {
    it("accepts a valid section", () => {
      const section1 = new LineSection(1, 9);
      const section2 = new LineSection(2, 5);
      const section3 = new LineSection(7, 9);
      const section4 = new LineSection(4, 6);
      expect(section1.validate(route, true)).toBe(true);
      expect(section2.validate(route, true)).toBe(true);
      expect(section3.validate(route, true)).toBe(true);
      expect(section4.validate(route, true)).toBe(true);
    });

    it("rejects 'the-city' as a station", () => {
      const section = new LineSection("the-city", 3);
      expect(section.validate(route, true)).toBe(false);
    });

    it("rejects sections that cross paths", () => {
      const section = new LineSection(5, 7);
      expect(section.validate(route, true)).toBe(false);
    });
  });
});
