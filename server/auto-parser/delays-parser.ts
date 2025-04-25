import { App } from "@/server/app";
import { AutoParserBase } from "@/server/auto-parser/auto-parser-base";
import {
  isOnCityBoundary,
  isPartOfTheCity,
  doesLineRunsThroughCityLoop,
} from "@/server/auto-parser/utils";
import { Alert } from "@/server/data/alert";
import { DelaysDisruptionData } from "@/server/data/disruption/data/delays-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { EndsApproximately } from "@/server/data/disruption/period/ends/ends-approximately";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { LineSection } from "@/server/data/line-section";
import { ALERTS } from "@/server/database/models/models";
import { nonNull, parseIntNull, unique } from "@dan-schel/js-utils";
import { addMinutes } from "date-fns";

export class DelaysParser extends AutoParserBase {
  constructor() {
    super();
  }

  async parseAlerts(app: App): Promise<Disruption[]> {
    const alerts = await app.database
      .of(ALERTS)
      .find({ where: { ignoreFutureUpdates: false, state: "new" } });

    const disruptions = alerts
      .filter(this._filterCriteria)
      .flatMap((x) => this._parser(x, app))
      .filter(nonNull);

    return disruptions;
  }

  private _filterCriteria({ data }: Alert): boolean {
    return data.title.startsWith("Delays up to") && data.startsAt !== null;
  }

  private _parser({ id, data }: Alert, app: App): Disruption | null {
    try {
      const delayInMinutes = parseIntNull(
        data.title.match(/(\d+ minutes)+/g)?.[0].split(" ")[0] ?? "",
      );

      if (!delayInMinutes) {
        return null;
      }

      const affectedStation = app.stations.requireFirst((x) =>
        data.title.includes(x.name),
      );
      const affectedLines = data.affectedLinePtvIds
        .map((x) => app.lines.requireByPtvId(x))
        .filter((x) =>
          x.route.getAllServedStations().includes(affectedStation.id),
        );

      const sections = affectedLines.flatMap((line) => {
        const nodes = line.route.getAllLineShapeNodes();
        const adjacentStations = unique(
          line.route
            .getAllRouteGraphPairs()
            .filter((x) =>
              isPartOfTheCity(affectedStation.id) &&
              doesLineRunsThroughCityLoop(nodes)
                ? isOnCityBoundary(x)
                : x.includes(affectedStation.id),
            )
            .flatMap(({ a, b }) => [a, b])
            .filter((x) => x !== affectedStation.id)
            .map((x) =>
              isPartOfTheCity(x) && doesLineRunsThroughCityLoop(nodes)
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

        if (line.route.isValidSection(section)) {
          return section;
        } else {
          return [];
        }
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
      );
    } catch {
      return null;
    }
  }
}
