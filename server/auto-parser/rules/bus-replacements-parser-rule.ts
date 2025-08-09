import { App } from "@/server/app";
import { AutoParserRuleBase } from "@/server/auto-parser/rules/auto-parser-rule-base";
import {
  isPartOfTheCity,
  doesLineRunThroughCityLoop,
} from "@/server/auto-parser/rules/utils";
import { Alert } from "@/server/data/alert/alert";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { EndsAfterLastService } from "@/server/data/disruption/period/ends/ends-after-last-service";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { utcToLocalTime } from "@/server/data/disruption/period/utils/utils";
import { LineSection } from "@/server/data/line-section";
import { nonNull, uuid } from "@dan-schel/js-utils";

export class BusReplacementsParserRule extends AutoParserRuleBase {
  constructor(app: App) {
    super(app);
  }

  parseAlert(alert: Alert, withId?: Disruption["id"]): Disruption | null {
    if (!this._couldParse(alert)) return null;

    return this._process(alert, withId);
  }

  private _couldParse({ data }: Alert): boolean {
    return (
      data.description.toLowerCase().includes("buses replace trains") &&
      // Only parse disruptions that have a definitive time period
      data.startsAt !== null &&
      data.endsAt !== null
    );
  }

  private _process(
    { id, data }: Alert,
    withId?: Disruption["id"],
  ): Disruption | null {
    const affectedLines = data.affectedLinePtvIds
      .map((x) => this._app.lines.findByPtvId(x))
      .filter(nonNull);

    const lineSections = affectedLines.flatMap((line) => {
      let stations = line.route
        .getAllServedStations()
        .filter((station) =>
          data.description.includes(this._app.stations.require(station).name),
        );

      // Indication that paritial match has occured
      if (stations.length > 2) {
        const names = stations.map((x) => this._app.stations.require(x).name);
        // Filter only stations where its name is only a substring to itself
        stations = stations.filter(
          (station) =>
            names.filter((stationName) =>
              stationName.includes(this._app.stations.require(station).name),
            ).length === 1,
        );
      }

      // Requires two stations to form a section
      if (stations.length !== 2) {
        return [];
      }

      const nodes = line.route.getAllLineShapeNodes();
      const a =
        doesLineRunThroughCityLoop(nodes) && isPartOfTheCity(stations[0])
          ? "the-city"
          : stations[0];
      const b =
        doesLineRunThroughCityLoop(nodes) && isPartOfTheCity(stations[1])
          ? "the-city"
          : stations[1];

      const section = new LineSection(line.id, a, b);
      return line.route.isValidSection(section) ? section : [];
    });

    if (lineSections.length === 0) {
      return null;
    }

    const endsOnLastService =
      data.title.includes("last service") ||
      data.description.includes("last service");
    const isEvening = data.description.includes("last service each night");

    const ends = endsOnLastService
      ? new EndsAfterLastService(JustDate.extractFromDate(data.endsAt!))
      : new EndsExactly(data.endsAt!);

    const startHour = utcToLocalTime(data.startsAt!).getHours();
    const startMinute = utcToLocalTime(data.startsAt!).getMinutes();
    const period = isEvening
      ? new EveningsOnlyDisruptionPeriod(
          data.startsAt,
          ends,
          startHour,
          startMinute,
        )
      : new StandardDisruptionPeriod(data.startsAt, ends);

    return new Disruption(
      withId ?? uuid(),
      new BusReplacementsDisruptionData(lineSections),
      [id],
      period,
      "automatic",
    );
  }
}
