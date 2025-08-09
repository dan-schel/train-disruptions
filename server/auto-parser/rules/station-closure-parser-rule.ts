import { App } from "@/server/app";
import { AutoParsingOutput } from "@/server/auto-parser/auto-parsing-output";
import { AutoParserRuleBase } from "@/server/auto-parser/rules/auto-parser-rule-base";
import { AlertData } from "@/server/data/alert/alert-data";

export class StationClosureAutoParserRule extends AutoParserRuleBase {
  constructor(app: App) {
    super(app);
  }

  parseAlert(data: AlertData): AutoParsingOutput | null {
    // TODO: currently don't have any examples :(
    if (!this._couldParse(data)) return null;

    return this._process(data);
  }

  private _couldParse(_data: AlertData): boolean {
    // TODO: currently don't have any examples :(
    return true;
  }

  private _process(_data: AlertData): AutoParsingOutput | null {
    return null;
  }
}
