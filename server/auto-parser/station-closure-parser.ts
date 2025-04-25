import { App } from "@/server/app";
import { AutoParserBase } from "@/server/auto-parser/auto-parser-base";
import { Disruption } from "@/server/data/disruption/disruption";

export class StationClosureAutoParser extends AutoParserBase {
  constructor() {
    super();
  }

  async parseAlerts(_app: App): Promise<Disruption[]> {
    // TODO: currently don't have any examples :(
    return [];
  }
}
