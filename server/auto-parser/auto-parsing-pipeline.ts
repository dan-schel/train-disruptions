import { App } from "@/server/app";
import { AutoParserRule } from "@/server/auto-parser/rules/auto-parser-rule-base";
import { BusReplacementsParserRule } from "@/server/auto-parser/rules/bus-replacements-parser-rule";
import { DelaysParserRule } from "@/server/auto-parser/rules/delays-parser-rule";
import { Alert } from "@/server/data/alert/alert";
import { Disruption } from "@/server/data/disruption/disruption";

export class AutoParsingPipeline {
  private readonly _rules: AutoParserRule[];

  constructor(app: App) {
    this._rules = [
      new BusReplacementsParserRule(app),
      new DelaysParserRule(app),
    ];
  }

  parseAlert(alert: Alert, withId?: Disruption["id"]): Disruption | null {
    for (const rule of this._rules) {
      const disruption = rule.parseAlert(alert, withId);

      if (disruption) return disruption;
    }

    return null;
  }
}
