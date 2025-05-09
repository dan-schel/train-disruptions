import { App } from "@/server/app";
import { AutoParserBase } from "@/server/auto-parser/auto-parser-base";
import { Alert } from "@/server/data/alert";
import { Disruption } from "@/server/data/disruption/disruption";

export class StationClosureAutoParser extends AutoParserBase {
  constructor() {
    super();
  }

  parseAlerts(_alerts: Alert[], _app: App): Disruption[] {
    // TODO: currently don't have any examples :(
    // return this.parseAlerts(alerts).map((x) => disruption);
    return [];
  }

  filterAlerts(alerts: Alert[]): Alert[] {
    // TODO: currently don't have any examples :(
    return alerts;
  }
}
