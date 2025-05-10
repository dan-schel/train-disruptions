import { App } from "@/server/app";
import { AutoParserBase } from "@/server/auto-parser/auto-parser-base";
import { Alert } from "@/server/data/alert";
import { Disruption } from "@/server/data/disruption/disruption";
import { nonNull } from "@dan-schel/js-utils";

export class StationClosureAutoParser extends AutoParserBase {
  constructor() {
    super();
  }

  parseAlerts(alerts: Alert[], app: App): Disruption[] {
    // TODO: currently don't have any examples :(
    return this._filterAlerts(alerts)
      .map((x) => this._process(x, app))
      .filter(nonNull);
  }

  private _filterAlerts(alerts: Alert[]): Alert[] {
    // TODO: currently don't have any examples :(
    return alerts;
  }

  private _process(_alert: Alert, _app: App): Disruption | null {
    return null;
  }
}
