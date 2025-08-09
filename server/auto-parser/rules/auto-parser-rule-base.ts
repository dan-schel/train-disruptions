import { App } from "@/server/app";
import { AutoParsingOutput } from "@/server/auto-parser/auto-parsing-output";
import { BusReplacementsParserRule } from "@/server/auto-parser/rules/bus-replacements-parser-rule";
import { DelaysParserRule } from "@/server/auto-parser/rules/delays-parser-rule";
import { StationClosureAutoParserRule } from "@/server/auto-parser/rules/station-closure-parser-rule";
import { AlertData } from "@/server/data/alert/alert-data";

export type AutoParserRule =
  | BusReplacementsParserRule
  | DelaysParserRule
  | StationClosureAutoParserRule;

export abstract class AutoParserRuleBase {
  constructor(protected readonly _app: App) {}

  abstract parseAlert(data: AlertData): AutoParsingOutput | null;
}
