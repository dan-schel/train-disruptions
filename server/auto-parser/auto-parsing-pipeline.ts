import { App } from "@/server/app";
import { AutoParserRule } from "@/server/auto-parser/rules/auto-parser-rule-base";
import { Alert } from "@/server/data/alert";
import { Disruption } from "@/server/data/disruption/disruption";

export class AutoParsingPipeline {
  constructor(private rules: AutoParserRule[]) {}

  parseAlert(alert: Alert, app: App): Disruption | null {
    for (const rule of this.rules) {
      const disruption = rule.parseAlert(alert, app);

      if (disruption) return disruption;
    }

    return null;
  }
}
