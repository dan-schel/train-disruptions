import { App } from "@/server/app";
import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
import { DelaysParser } from "@/server/auto-parser/delays-parser";
import { ALERTS } from "@/server/database/models/models";

export type AutoParserRule = BusReplacementsParser | DelaysParser;

export class AutoParser {
  constructor(private rules: AutoParserRule[]) {}

  async parseAlerts(app: App) {
    const alerts = await app.database.of(ALERTS).find({
      where: {
        state: "new",
        ignoreFutureUpdates: false,
      },
    });
    return this.rules.flatMap((rule) => rule.parseAlerts(alerts, app));
  }
}
