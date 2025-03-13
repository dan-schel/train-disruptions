import { uuid } from "@dan-schel/js-utils";
import { LineCollection } from "@/server/data/static/line-collection";
import { StationCollection } from "@/server/data/static/station-collection";
import { Database } from "@/server/database/lib/general/database";
import { Crayon } from "@/server/database/models/crayons";
import { CRAYONS, HISTORICAL_ALERTS } from "@/server/database/models/models";
import { DisruptionSource } from "@/server/disruption-source/disruption-source";
import { InMemoryDatabase } from "@/server/database/lib/in-memory/in-memory-database";
import { FakeDisruptionSource } from "@/server/disruption-source/fake-disruption-source";
import { HistoricalAlert } from "@/server/data/historical-alert";
import { migrations } from "@/server/database/migrations/migrations";

export class App {
  constructor(
    readonly lines: LineCollection,
    readonly stations: StationCollection,
    readonly database: Database,
    readonly disruptionSource: DisruptionSource,
    readonly time: TimeProvider,
  ) {}

  async init() {
    // Has to run before anything else that might use the database.
    await this.database.runMigrations(migrations);

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
        try {
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
        } catch (error) {
          console.warn("Failed to log historical alerts.");
          console.warn(error);
        }
      },
      1000 * 60 * 5,
    );
  }
}
