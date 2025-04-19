import { App } from "@/server/app";
import { AutoParserBase } from "@/server/auto-parser/auto-parser-base";
import { Disruption } from "@/server/data/disruption/disruption";

export class DelaysAutoParser extends AutoParserBase {
  async parseAlerts(_app: App): Promise<Disruption[]> {
    // TODO
    return [];
  }
}
