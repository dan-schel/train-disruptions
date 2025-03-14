import { z } from "zod";
import { StationClosureDisruptionData } from "@/server/data/disruption/data/station-closure-disruption-data";
import { CustomDisruptionData } from "@/server/data/disruption/data/custom-disruption-data";
import { BusReplacementsDisruptionData } from "@/server/data/disruption/data/bus-replacements-disruption-data";

/**
 * Stores the data inherent to this particular type of disruption.
 *
 * (All implementations of DisruptionDataBase.)
 */
export type DisruptionData =
  | CustomDisruptionData
  | StationClosureDisruptionData
  | BusReplacementsDisruptionData;

export const disruptionDataBson = z.union([
  CustomDisruptionData.bson,
  StationClosureDisruptionData.bson,
  BusReplacementsDisruptionData.bson,
]);
