import { App } from "@/server/app";
import { AutoParserBase } from "@/server/auto-parser/auto-parser-base";
import {
  isPartOfTheCity,
  doesLineRunsThroughCityLoop,
} from "@/server/auto-parser/utils";
import { Alert } from "@/server/data/alert";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";
import { Disruption } from "@/server/data/disruption/disruption";
import { EndsAfterLastService } from "@/server/data/disruption/period/ends/ends-after-last-service";
import { EndsExactly } from "@/server/data/disruption/period/ends/ends-exactly";
import { EveningsOnlyDisruptionPeriod } from "@/server/data/disruption/period/evenings-only-disruption-period";
import { StandardDisruptionPeriod } from "@/server/data/disruption/period/standard-disruption-period";
import { JustDate } from "@/server/data/disruption/period/utils/just-date";
import { utcToLocalTime } from "@/server/data/disruption/period/utils/utils";
import { LineSection } from "@/server/data/line-section";
import { ALERTS } from "@/server/database/models/models";
import { nonNull } from "@dan-schel/js-utils";

export class BusReplacementsParser extends AutoParserBase {
  constructor() {
    super();
  }

  async parseAlerts(app: App): Promise<Disruption[]> {
    const alerts = await app.database
      .of(ALERTS)
      .find({ where: { ignoreFutureUpdates: false, state: "new" } }); // TODO: mark as auto processed

    const disruptions = alerts
      .filter(this._filterCriteria)
      .map((x) => {
        try {
          return this._parse(x, app);
        } catch {
          return null;
        }
      })
      .filter(nonNull);

    return disruptions;
  }

  private _filterCriteria({ data }: Alert) {
    return (
      data.description.toLowerCase().includes("buses replace trains") &&
      // Only parse disruptions that have a definitive time period
      data.startsAt !== null &&
      data.endsAt !== null
    );
  }

  private _parse({ id, data }: Alert, app: App) {
    const affectedLines = data.affectedLinePtvIds.map((x) =>
      app.lines.requireByPtvId(x),
    );

    const lineSections = affectedLines.map((x) => {
      const line = app.lines.require(x.id);
      const stations = line.route
        .getAllServedStations()
        .map((x) => app.stations.require(x))
        .filter((x) => data.description.includes(x.name));

      if (stations.length !== 2) {
        throw new Error("requires 2 stations on a line");
      }

      const nodes = line.route.getAllLineShapeNodes();
      const a =
        doesLineRunsThroughCityLoop(nodes) && isPartOfTheCity(stations[0].id)
          ? "the-city"
          : stations[0].id;
      const b =
        doesLineRunsThroughCityLoop(nodes) && isPartOfTheCity(stations[1].id)
          ? "the-city"
          : stations[1].id;

      const section = new LineSection(x.id, a, b);
      if (!line.route.isValidSection(section)) {
        throw new Error("not a valid section");
      }

      return section;
    });

    const endsOnLastService =
      data.title.includes("last service") ||
      data.description.includes("last service");
    const isEvening = data.description.includes("last service each night");

    const ends = endsOnLastService
      ? new EndsAfterLastService(JustDate.extractFromDate(data.endsAt!))
      : new EndsExactly(data.endsAt!);

    // TODO: Update disruptions writeup since bus replacements doesn't always start on the hour
    // Current ouput - 8pm to last service each night, starting 8:30pm Tue 22nd Apr until last service Wed 23rd Apr
    // Suggestion - 8:30pm to last service each night, starting Tue 22nd Apr until last service Wed 23rd Apr
    const startHour = utcToLocalTime(data.startsAt!).getHours();
    const period = isEvening
      ? new EveningsOnlyDisruptionPeriod(data.startsAt, ends, startHour)
      : new StandardDisruptionPeriod(data.startsAt, ends);

    return new Disruption(
      id, // TODO: Dependent on how we store in DB
      new BusReplacementsDisruptionData(lineSections),
      [id],
      period,
    );
  }
}
