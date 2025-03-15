import { uuid } from "@dan-schel/js-utils";
import { StationCollection } from "@/server/data/station/station-collection";
import { Database } from "@/server/database/lib/general/database";
import { Crayon } from "@/server/database/models/crayons";
import {
  CRAYONS,
  DEPLOYMENT_LOGS,
  HISTORICAL_ALERTS,
} from "@/server/database/models/models";
import { AlertSource } from "@/server/alert-source/alert-source";
import { InMemoryDatabase } from "@/server/database/lib/in-memory/in-memory-database";
import { FakeAlertSource } from "@/server/alert-source/fake-alert-source";
import { HistoricalAlert } from "@/server/data/historical-alert";
import { migrations } from "@/server/database/migrations/migrations";
import { DiscordClient } from "@/server/discord";
import { subHours } from "date-fns";
import { LineCollection } from "@/server/data/line/line-collection";
import { TimeProvider } from "@/server/time-provider";

export class App {
  constructor(
    readonly lines: LineCollection,
    readonly stations: StationCollection,
    readonly database: Database,
    readonly alertSource: AlertSource,
    readonly discordClient: DiscordClient | null,
    readonly time: TimeProvider,
    readonly commitHash: string | null,
  ) {}

  async init() {
    // Has to run before anything else that might use the database.
    await this.database.runMigrations(migrations);

    await this._runStartUpLogger();

    // TODO: This is temporary.
    await this._runDatabaseDemo();
    await this._runAlertSourceDemo();
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

  private async _runAlertSourceDemo() {
    try {
      const disruptions = await this.alertSource.fetchDisruptions();

      if (this.alertSource instanceof FakeAlertSource) {
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
          const disruptions = await this.alertSource.fetchDisruptions();

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

  /**
   * Logs the current deployment into the database and sends a message on Discord via a webhook
   */
  private async _runStartUpLogger() {
    try {
      if (this.discordClient === null || this.commitHash === null) {
        console.warn("🟡 Discord client not setup yet.");
      } else {
        const deployments = await this.database.of(DEPLOYMENT_LOGS).find({
          where: { commitHash: this.commitHash },
          sort: {
            by: "createdAt",
            direction: "desc",
          },
        });

        await this.database.of(DEPLOYMENT_LOGS).create({
          id: uuid(),
          commitHash: this.commitHash,
          createdAt: new Date(),
        });

        const lastDeployment = deployments.at(0)?.createdAt ?? new Date(0);

        if (
          deployments.length < 2 ||
          subHours(new Date(), 1) > lastDeployment
        ) {
          await this.discordClient.sendMessage(deployments.length > 0);
        }
      }
    } catch (error) {
      console.warn("🔴 Failed to log deployment.");
      console.warn(error);
    }
  }
}
