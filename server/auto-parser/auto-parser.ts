import { App } from "@/server/app";
import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
import { DelaysParser } from "@/server/auto-parser/delays-parser";
import { Alert } from "@/server/data/alert";

export type AutoParserRule = BusReplacementsParser | DelaysParser;

export class AutoParser {
  constructor(private rules: AutoParserRule[]) {}

  async parseAlerts(alerts: Alert[], app: App) {
    return this.rules.flatMap((rule) => rule.parseAlerts(alerts, app));
  }
}
