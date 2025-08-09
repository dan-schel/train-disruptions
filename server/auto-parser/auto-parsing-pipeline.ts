import { App } from "@/server/app";
import { AutoParsingOutput } from "@/server/auto-parser/auto-parsing-output";
import { AutoParserRule } from "@/server/auto-parser/rules/auto-parser-rule-base";
import { BusReplacementsParserRule } from "@/server/auto-parser/rules/bus-replacements-parser-rule";
import { DelaysParserRule } from "@/server/auto-parser/rules/delays-parser-rule";
import { AlertData } from "@/server/data/alert/alert-data";

export class AutoParsingPipeline {
  private readonly _rules: AutoParserRule[];

  constructor(app: App) {
    this._rules = [
      new BusReplacementsParserRule(app),
      new DelaysParserRule(app),
    ];
  }

  parseAlert(data: AlertData): AutoParsingOutput | null {
    for (const rule of this._rules) {
      const output = rule.parseAlert(data);
      if (output) return output;
    }
    return null;
  }
}
