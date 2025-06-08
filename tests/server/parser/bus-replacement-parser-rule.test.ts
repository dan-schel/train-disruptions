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
    const parser = new BusReplacementsParserRule();

    const disruption = parser.parseAlert(AlertStandardToAfterLastService, app);

    expect(disruption).not.toBeNull();
    expect(disruption).toHaveProperty(
      "data",
      new BusReplacementsDisruptionData([
        new LineSection(SUNBURY, station.NORTH_MELBOURNE, station.SUNSHINE),
      ]),
    );
    expect(disruption).toHaveProperty("sourceAlertIds", [
      AlertStandardToAfterLastService.id,
    ]);
    expect(disruption).toHaveProperty(
      "period",
      new StandardDisruptionPeriod(
        AlertStandardToAfterLastService.data.startsAt,
        new EndsAfterLastService(
          JustDate.extractFromDate(
            AlertStandardToAfterLastService.data.endsAt!,
          ),
        ),
      ),
    );
    expect(disruption).toHaveProperty("curation", "automatic");
  });

  it("parses alert to a disruption with a standard period that ends at an exact time", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule();

    const disruption = parser.parseAlert(AlertStandardToExactly, app);

    expect(disruption).not.toBeNull();
    expect(disruption).toHaveProperty(
      "data",
      new BusReplacementsDisruptionData([
        new LineSection(WERRIBEE, station.NEWPORT, station.WERRIBEE),
      ]),
    );
    expect(disruption).toHaveProperty("sourceAlertIds", [
      AlertStandardToExactly.id,
    ]);
    expect(disruption).toHaveProperty(
      "period",
      new StandardDisruptionPeriod(
        AlertStandardToExactly.data.startsAt,
        new EndsExactly(AlertStandardToExactly.data.endsAt!),
      ),
    );
    expect(disruption).toHaveProperty("curation", "automatic");
  });

  it("parses alert to a disruption with a evening only period that ends after the last service", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule();

    const disruption = parser.parseAlert(
      AlertEveningsOnlyToAfterLastService,
      app,
    );

    expect(disruption).not.toBeNull();
    expect(disruption).toHaveProperty(
      "data",
      new BusReplacementsDisruptionData([
        new LineSection(BELGRAVE, station.BLACKBURN, station.BELGRAVE),
        new LineSection(LILYDALE, station.BLACKBURN, station.LILYDALE),
      ]),
    );
    expect(disruption).toHaveProperty("sourceAlertIds", [
      AlertEveningsOnlyToAfterLastService.id,
    ]);
    expect(disruption).toHaveProperty(
      "period",
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
    expect(disruption).toHaveProperty("curation", "automatic");
  });

  it("selects the correct stations", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule();

    const disruption = parser.parseAlert(AlertNameCollision, app);

    expect(disruption).not.toBeNull();
    expect(disruption).toHaveProperty(
      "data",
      new BusReplacementsDisruptionData([
        new LineSection(
          SUNBURY,
          station.MIDDLE_FOOTSCRAY,
          station.WEST_FOOTSCRAY,
        ),
      ]),
    );
    expect(disruption).toHaveProperty("sourceAlertIds", [
      AlertNameCollision.id,
    ]);
    expect(disruption).toHaveProperty(
      "period",
      new EveningsOnlyDisruptionPeriod(
        AlertNameCollision.data.startsAt,
        new EndsAfterLastService(
          JustDate.extractFromDate(AlertNameCollision.data.endsAt!),
        ),
        utcToLocalTime(AlertNameCollision.data.startsAt!).getHours(),
        utcToLocalTime(AlertNameCollision.data.startsAt!).getMinutes(),
      ),
    );
    expect(disruption).toHaveProperty("curation", "automatic");
  });

  it("ignores alerts that don't qualify as bus replacements", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParserRule();

    const alerts = Object.values(SampleAlerts.Delays);
    const disruptions = alerts.map((x) => parser.parseAlert(x, app));

    expect(disruptions).toHaveLength(alerts.length);
    expect(disruptions).toStrictEqual(
      Array.from({ length: alerts.length }, () => null),
    );
  });
});
