import { App } from "@/server/app";
import { BusReplacementsParserRule } from "@/server/auto-parser/rules/bus-replacements-parser-rule";
import { DelaysParserRule } from "@/server/auto-parser/rules/delays-parser-rule";
import { StationClosureAutoParserRule } from "@/server/auto-parser/rules/station-closure-parser-rule";
import { Alert } from "@/server/data/alert/alert";
import { Disruption } from "@/server/data/disruption/disruption";

export type AutoParserRule =
  | BusReplacementsParserRule
  | DelaysParserRule
  | StationClosureAutoParserRule;

export abstract class AutoParserRuleBase {
  abstract parseAlert(
    alert: Alert,
    app: App,
    withId?: Disruption["id"],
  ): Disruption | null;
}
