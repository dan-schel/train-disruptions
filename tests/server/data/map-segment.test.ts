import { MapSegment } from "@/server/data/map-segment";
import { Range } from "@/server/data/utils/range";
import { describe, expect, it } from "vitest";

describe("MapSegment", () => {
  describe("#condense", () => {
    it("should combine neighbouring segments into one", () => {
      const segments = [
        new MapSegment(1, 2, new Range(0.25, 0.5)),
        new MapSegment(1, 2, new Range(0.5, 1)),
      ];
      const condensed = MapSegment.condense(segments);
      expect(condensed).toEqual([new MapSegment(1, 2, new Range(0.25, 1))]);
    });

    it("should handle reversed segments", () => {
      const segments = [
        new MapSegment(1, 2, new Range(0, 0.5)),
        new MapSegment(2, 1, new Range(0, 0.5)),
      ];
      const condensed = MapSegment.condense(segments);
      expect(condensed).toEqual([new MapSegment(1, 2, new Range(0, 1))]);
    });

    it("should treat different node pairs separately", () => {
      const segments = [
        new MapSegment(1, 2, new Range(0, 0.5)),
        new MapSegment(2, 3, new Range(0.5, 1)),
      ];
      const condensed = MapSegment.condense(segments);
      expect(condensed).toEqual([
        new MapSegment(1, 2, new Range(0, 0.5)),
        new MapSegment(2, 3, new Range(0.5, 1)),
      ]);
    });
  });
});
