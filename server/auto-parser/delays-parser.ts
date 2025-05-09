import { App } from "@/server/app";
import { AutoParserBase } from "@/server/auto-parser/auto-parser-base";
import {
  isOnCityBoundary,
  isPartOfTheCity,
  doesLineRunThroughCityLoop,
} from "@/server/auto-parser/utils";
import { Alert } from "@/server/data/alert";
import { DelaysDisruptionData } from "@/server/data/disruption/data/delays-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { EndsApproximately } from "@/server/data/disruption/period/ends/ends-approximately";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { LineSection } from "@/server/data/line-section";
import { Line } from "@/server/data/line/line";
import { nonNull, parseIntNull, unique } from "@dan-schel/js-utils";
import { addMinutes } from "date-fns";

export class DelaysParser extends AutoParserBase {
  constructor() {
    super();
  }

  parseAlerts(alerts: Alert[], app: App): Disruption[] {
    return this.filterAlerts(alerts)
      .flatMap((x) => this._parser(x, app))
      .filter(nonNull);
  }

  filterAlerts(alerts: Alert[]): Alert[] {
    return alerts.filter(
      ({ data }) =>
        data.title.startsWith("Delays up to") && data.startsAt !== null,
    );
  }

  private _parser({ id, data }: Alert, app: App): Disruption | null {
    const delayInMinutes = parseIntNull(
      data.title
        .match(/(\d+ minutes)+/g)
        ?.at(0)
        ?.split(" ")
        .at(0) ?? "",
    );

    if (!delayInMinutes) {
      return null;
    }

    const affectedStation = app.stations.first((x) =>
      data.title.includes(x.name),
    );
    if (!affectedStation) {
      return null;
    }

    const affectedLines = data.affectedLinePtvIds
      .map((x) => app.lines.findByPtvId(x))
      .filter(
        (x): x is Line =>
          x !== null &&
          x.route.getAllServedStations().includes(affectedStation.id),
      );

    // Get sections comprising of adjacent stations
    const sections = affectedLines.flatMap((line) => {
      const nodes = line.route.getAllLineShapeNodes();
      const adjacentStations = unique(
        line.route
          .getAllRouteGraphPairs()
          .filter((x) =>
            isPartOfTheCity(affectedStation.id) &&
            doesLineRunThroughCityLoop(nodes)
              ? isOnCityBoundary(x)
              : x.includes(affectedStation.id),
          )
          .flatMap(({ a, b }) => [a, b])
          .filter((x) => x !== affectedStation.id)
          .map((x) =>
            isPartOfTheCity(x) && doesLineRunThroughCityLoop(nodes)
              ? "the-city"
              : x,
          ),
      );

      let section: LineSection;
      if (adjacentStations.length === 2) {
        section = new LineSection(
          line.id,
          adjacentStations[0],
          adjacentStations[1],
        );
      } else if (adjacentStations.length === 1) {
        section = new LineSection(
          line.id,
          affectedStation.id,
          adjacentStations[0],
        );
      } else {
        return [];
      }

      return line.route.isValidSection(section) ? section : [];
    });

    return new Disruption(
      id,
      new DelaysDisruptionData(affectedStation.id, delayInMinutes, sections),
      [id],
      new StandardDisruptionPeriod(
        data.startsAt!,
        // TODO: Change this to when EndsWhenAlertEnds is implemented
        new EndsApproximately(
          `approximately ${delayInMinutes} minutes`,
          data.startsAt!,
          addMinutes(data.startsAt!, delayInMinutes),
        ),
      ),
      "automatic",
    );
  }
}
