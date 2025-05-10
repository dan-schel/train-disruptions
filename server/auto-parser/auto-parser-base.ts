import { App } from "@/server/app";
import { Alert } from "@/server/data/alert";
import { Disruption } from "@/server/data/disruption/disruption";

export abstract class AutoParserBase {
  abstract parseAlerts(alerts: Alert[], app: App): Disruption[];
}
