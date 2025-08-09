import { App } from "@/server/app";
import { AutoParserRuleBase } from "@/server/auto-parser/rules/auto-parser-rule-base";
import { Alert } from "@/server/data/alert/alert";
import { Disruption } from "@/server/data/disruption/disruption";

export class StationClosureAutoParserRule extends AutoParserRuleBase {
  constructor() {
    super();
  }

  parseAlert(
    alert: Alert,
    app: App,
    withId?: Disruption["id"],
  ): Disruption | null {
    // TODO: currently don't have any examples :(
    if (!this._couldParse(alert)) return null;

    return this._process(alert, app, withId);
  }

  private _couldParse(_alert: Alert): boolean {
    // TODO: currently don't have any examples :(
    return true;
  }

  private _process(
    _alert: Alert,
    _app: App,
    _withId?: Disruption["id"],
  ): Disruption | null {
    return null;
  }
}
