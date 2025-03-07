import { describe, expect, it } from "vitest";
import { EndsAfterLastService } from "../../../../../server/data/disruption/period/ends/ends-after-last-service";

describe("EndsAfterLastService", () => {
  describe("getDisplayString", () => {
    it("works", () => {
      const options = {
        now: new Date("2025-03-04T00:00:00.000Z"),
      };

      expect(
        new EndsAfterLastService(2025, 3, 7).getDisplayString(options),
      ).toBe("last service Fri 7th Mar");
      expect(
        new EndsAfterLastService(2026, 3, 7).getDisplayString(options),
      ).toBe("last service Sat 7th Mar 2026");
    });
  });

  describe("latestInterpretableDate", () => {
    it("works", () => {
      expect(
        new EndsAfterLastService(2025, 3, 7).latestInterpretableDate(),
      ).toEqual(new Date("2025-03-07T16:00:00.000Z"));
    });
  });
});
