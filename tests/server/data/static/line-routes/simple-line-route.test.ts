import { describe, expect, it } from "vitest";
import { LineSection } from "../../../../../server/data/line-section";
import { SimpleLineRoute } from "../../../../../server/data/static/line-routes/simple-line-route";

const route = new SimpleLineRoute([1, 2, 3, 4, 5]);

describe("SimpleLineRoute", () => {
  describe("#validateLineSection", () => {
    it("accepts a valid section", () => {
      const section = new LineSection(1, 2);
      const result = route.validateLineSection(section);
      expect(result.valid).toBe(true);
    });

    it("rejects 'the-city' as a station", () => {
      const section = new LineSection("the-city", 1);
      const result = route.validateLineSection(section);
      expect(result.valid).toBe(false);
    });

    it("rejects a section with a station not in the line", () => {
      const section = new LineSection(1, 6);
      const result = route.validateLineSection(section);
      expect(result.valid).toBe(false);
    });
  });
});
