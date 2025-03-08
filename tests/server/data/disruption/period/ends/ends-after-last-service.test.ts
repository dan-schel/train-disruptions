import { describe, expect, it } from "vitest";
import { EndsAfterLastService } from "../../../../../../server/data/disruption/period/ends/ends-after-last-service";
import { JustDate } from "../../../../../../server/data/disruption/period/utils/just-date";

describe("EndsAfterLastService", () => {
  const end1 = new EndsAfterLastService(new JustDate(2025, 3, 7));
  const end2 = new EndsAfterLastService(new JustDate(2026, 6, 7));

  describe("getDisplayString", () => {
    it("works", () => {
      const options = {
        now: new Date("2025-03-07T10:24:14.000+11:00"),
      };

      expect(end1.getDisplayString(options)).toBe("last service Fri 7th Mar");
      expect(end2.getDisplayString(options)).toBe(
        "last service Sun 7th Jun 2026",
      );
    });
  });

  describe("latestInterpretableDate", () => {
    it("works", () => {
      expect(end1.getLatestInterpretableDate()).toEqual(
        new Date("2025-03-08T03:00:00.000+11:00"),
      );
      expect(end2.getLatestInterpretableDate()).toEqual(
        new Date("2026-06-08T03:00:00.000+10:00"),
      );
    });
  });
});
