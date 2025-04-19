import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";

export abstract class AutoParserBase {
  abstract parseAlerts(app: App): Promise<Disruption[]>;
}
