import { uuid } from "@dan-schel/js-utils";
import { LineCollection } from "./data/static/line-collection";
import { StationCollection } from "./data/static/station-collection";
import { Database } from "./database/lib/general/database";
import { Crayon } from "./database/models/crayons";
import { CRAYONS, HISTORICAL_ALERTS } from "./database/models/models";
import { DisruptionSource } from "./disruption-source/disruption-source";
import { InMemoryDatabase } from "./database/lib/in-memory/in-memory-database";
import { FakeDisruptionSource } from "./disruption-source/fake-disruption-source";
import { HistoricalAlert } from "./data/historical-alert";
import { env } from "./env";

export class App {
  constructor(
    readonly lines: LineCollection,
    readonly stations: StationCollection,
    readonly database: Database,
    readonly disruptionSource: DisruptionSource,
  ) {}

  async init() {
    // TODO: This is temporary.
    await this._runDatabaseDemo();
    await this._runDisruptionSourceDemo();
    this._runHistoricalAlertLogger();
  }

  onServerStarted(port: number) {
    // eslint-disable-next-line no-console
    console.log(`🟢 Server listening on http://localhost:${port}`);
  }

  private async _runDatabaseDemo() {
    try {
      await this.database
        .of(CRAYONS)
        .create(new Crayon(uuid(), "red", 100, []));

      if (this.database instanceof InMemoryDatabase) {
        console.warn("🟡 Database connection not set up yet.");
      } else {
        // eslint-disable-next-line no-console
        console.log("🟢 Successfully connected to the database.");
      }
    } catch (error) {
      console.warn("🔴 Failed to connect to the database.");
      console.warn(error);
    }
  }

  private async _runDisruptionSourceDemo() {
    try {
      const disruptions = await this.disruptionSource.fetchDisruptions();

      if (this.disruptionSource instanceof FakeDisruptionSource) {
        console.warn("🟡 Relay connection not set up yet.");
      } else {
        // eslint-disable-next-line no-console
        console.log(
          `🟢 Successfully fetched ${disruptions.length} disruption(s) from VTAR.`,
        );
      }
    } catch (error) {
      console.warn("🔴 Failed to fetch disruptions.");
      console.warn(error);
    }
  }

  private _runHistoricalAlertLogger() {
    setInterval(
      async () => {
        const disruptions = await this.disruptionSource.fetchDisruptions();

        disruptions.forEach(async (disruption) => {
          const x = await this.database
            .of(HISTORICAL_ALERTS)
            .get(disruption.disruption_id);
          if (x == null) {
            await this.database
              .of(HISTORICAL_ALERTS)
              .create(
                new HistoricalAlert(
                  disruption.disruption_id,
                  disruption.title,
                  disruption.description,
                ),
              );
          }
        });
      },
      1000 * 60 * 5,
    );
  }
}
