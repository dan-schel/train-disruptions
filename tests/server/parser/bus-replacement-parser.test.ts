import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
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
import {
  BELGRAVE as BELGRAVE_STATION,
  BLACKBURN,
  LILYDALE as LILYDALE_STATION,
  NEWPORT,
  NORTH_MELBOURNE,
  SUNSHINE,
  WERRIBEE as WERRIBEE_STATION,
} from "@/shared/station-ids";

describe("Bus Replacement Auto Parser", () => {
  const {
    AlertStandardToAfterLastService,
    AlertStandardToExactly,
    AlertEveningsOnlyToAfterLastService,
  } = SampleAlerts.BusReplacements;

  it("parses alert to a disruption with a standard period that ends after the last service", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParser();

    const disruptions = parser.parseAlerts(
      [AlertStandardToAfterLastService],
      app,
    );

    expect(disruptions).toHaveLength(1);
    expect(disruptions.at(0)).toHaveProperty(
      "data",
      new BusReplacementsDisruptionData([
        new LineSection(SUNBURY, NORTH_MELBOURNE, SUNSHINE),
      ]),
    );
    expect(disruptions.at(0)).toHaveProperty("sourceAlertIds", [
      AlertStandardToAfterLastService.id,
    ]);
    expect(disruptions.at(0)).toHaveProperty(
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
    expect(disruptions.at(0)).toHaveProperty("curation", "automatic");
  });

  it("parses alert to a disruption with a standard period that ends at an exact time", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParser();

    const disruptions = parser.parseAlerts([AlertStandardToExactly], app);

    expect(disruptions).toHaveLength(1);
    expect(disruptions.at(0)).toHaveProperty(
      "data",
      new BusReplacementsDisruptionData([
        new LineSection(WERRIBEE, NEWPORT, WERRIBEE_STATION),
      ]),
    );
    expect(disruptions.at(0)).toHaveProperty("sourceAlertIds", [
      AlertStandardToExactly.id,
    ]);
    expect(disruptions.at(0)).toHaveProperty(
      "period",
      new StandardDisruptionPeriod(
        AlertStandardToExactly.data.startsAt,
        new EndsExactly(AlertStandardToExactly.data.endsAt!),
      ),
    );
    expect(disruptions.at(0)).toHaveProperty("curation", "automatic");
  });

  it("parses alert to a disruption with a evening only period that ends after the last service", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParser();

    const disruptions = parser.parseAlerts(
      [AlertEveningsOnlyToAfterLastService],
      app,
    );

    expect(disruptions).toHaveLength(1);
    expect(disruptions.at(0)).toHaveProperty(
      "data",
      new BusReplacementsDisruptionData([
        new LineSection(BELGRAVE, BLACKBURN, BELGRAVE_STATION),
        new LineSection(LILYDALE, BLACKBURN, LILYDALE_STATION),
      ]),
    );
    expect(disruptions.at(0)).toHaveProperty("sourceAlertIds", [
      AlertEveningsOnlyToAfterLastService.id,
    ]);
    expect(disruptions.at(0)).toHaveProperty(
      "period",
      new EveningsOnlyDisruptionPeriod(
        AlertEveningsOnlyToAfterLastService.data.startsAt,
        new EndsAfterLastService(
          JustDate.extractFromDate(
            AlertEveningsOnlyToAfterLastService.data.endsAt!,
          ),
        ),
        20,
        30,
      ),
    );
    expect(disruptions.at(0)).toHaveProperty("curation", "automatic");
  });

  it("ignores alerts that don't qualify as bus replacements", () => {
    const { app } = createTestApp();
    const parser = new BusReplacementsParser();

    const disruptions = parser.parseAlerts(
      Object.values(SampleAlerts.Delays),
      app,
    );

    expect(disruptions).toHaveLength(0);
  });
});
