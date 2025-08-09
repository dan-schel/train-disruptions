import { BusReplacementsParserRule } from "@/server/auto-parser/rules/bus-replacements-parser-rule";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { EndsAfterLastService } from "@/server/data/disruption/period/ends/ends-after-last-service";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { LineSection } from "@/server/data/line-section";
import { createTestApp } from "@/tests/server/utils";
import { describe, expect, it } from "vitest";
import { SampleAlerts } from "@/tests/server/parser/sample-alerts";
import { BELGRAVE, LILYDALE, SUNBURY, WERRIBEE } from "@/shared/line-ids";
import * as station from "@/shared/station-ids";
import { utcToLocalTime } from "@/server/data/disruption/period/utils/utils";

describe("Bus Replacement Auto Parser", () => {
  const {
    AlertStandardToAfterLastService,
    AlertStandardToExactly,
    AlertEveningsOnlyToAfterLastService,
    AlertNameCollision,
  } = SampleAlerts.BusReplacements;

  it("parses alert to a disruption with a standard period that ends after the last service", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule(app);
    const output = parser.parseAlert(AlertStandardToAfterLastService.data);

    expect(output).not.toBeNull();
    expect(output?.data).toStrictEqual(
      new BusReplacementsDisruptionData([
        new LineSection(SUNBURY, station.NORTH_MELBOURNE, station.SUNSHINE),
      ]),
    );
    expect(output?.period).toStrictEqual(
      new StandardDisruptionPeriod(
        AlertStandardToAfterLastService.data.startsAt,
        new EndsAfterLastService(
          JustDate.extractFromDate(
            AlertStandardToAfterLastService.data.endsAt!,
          ),
        ),
      ),
    );
  });

  it("parses alert to a disruption with a standard period that ends at an exact time", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule(app);
    const output = parser.parseAlert(AlertStandardToExactly.data);

    expect(output).not.toBeNull();
    expect(output?.data).toStrictEqual(
      new BusReplacementsDisruptionData([
        new LineSection(WERRIBEE, station.NEWPORT, station.WERRIBEE),
      ]),
    );
    expect(output?.period).toStrictEqual(
      new StandardDisruptionPeriod(
        AlertStandardToExactly.data.startsAt,
        new EndsExactly(AlertStandardToExactly.data.endsAt!),
      ),
    );
  });

  it("parses alert to a disruption with a evening only period that ends after the last service", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule(app);

    const output = parser.parseAlert(AlertEveningsOnlyToAfterLastService.data);

    expect(output).not.toBeNull();
    expect(output?.data).toStrictEqual(
      new BusReplacementsDisruptionData([
        new LineSection(BELGRAVE, station.BLACKBURN, station.BELGRAVE),
        new LineSection(LILYDALE, station.BLACKBURN, station.LILYDALE),
      ]),
    );
    expect(output?.period).toStrictEqual(
      new EveningsOnlyDisruptionPeriod(
        AlertEveningsOnlyToAfterLastService.data.startsAt,
        new EndsAfterLastService(
          JustDate.extractFromDate(
            AlertEveningsOnlyToAfterLastService.data.endsAt!,
          ),
        ),
        utcToLocalTime(
          AlertEveningsOnlyToAfterLastService.data.startsAt!,
        ).getHours(),
        utcToLocalTime(
          AlertEveningsOnlyToAfterLastService.data.startsAt!,
        ).getMinutes(),
      ),
    );
  });

  it("selects the correct stations", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule(app);
    const output = parser.parseAlert(AlertNameCollision.data);

    expect(output).not.toBeNull();
    expect(output?.data).toStrictEqual(
      new BusReplacementsDisruptionData([
        new LineSection(
          SUNBURY,
          station.MIDDLE_FOOTSCRAY,
          station.WEST_FOOTSCRAY,
        ),
      ]),
    );
    expect(output?.period).toStrictEqual(
      new EveningsOnlyDisruptionPeriod(
        AlertNameCollision.data.startsAt,
        new EndsAfterLastService(
          JustDate.extractFromDate(AlertNameCollision.data.endsAt!),
        ),
        utcToLocalTime(AlertNameCollision.data.startsAt!).getHours(),
        utcToLocalTime(AlertNameCollision.data.startsAt!).getMinutes(),
      ),
    );
  });

  it("ignores alerts that don't qualify as bus replacements", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule(app);
    const output = Object.values(SampleAlerts.Delays);
    const outputs = output.map((x) => parser.parseAlert(x.data));

    expect(outputs).toHaveLength(output.length);
    expect(outputs).toStrictEqual(
      Array.from({ length: output.length }, () => null),
    );
  });
});
