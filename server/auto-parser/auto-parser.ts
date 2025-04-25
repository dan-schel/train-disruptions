import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
import { DelaysParser } from "@/server/auto-parser/delays-parser";

export type DisruptionParser = BusReplacementsParser | DelaysParser;
