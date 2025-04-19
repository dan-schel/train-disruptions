import { BusReplacementsParser } from "@/server/auto-parser/bus-replacements-parser";
import { DelaysAutoParser } from "@/server/auto-parser/delays-auto-parser";

export type DisruptionParser = BusReplacementsParser | DelaysAutoParser;
