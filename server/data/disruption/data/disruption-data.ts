import { z } from "zod";
import { StationClosureDisruptionData } from "./station-closure-disruption-data";
import { CustomDisruptionData } from "./custom-disruption-data";

/**
 * Stores the data inherent to this particular type of disruption.
 *
 * (All implementations of DisruptionDataBase.)
 */
export type DisruptionData =
  | CustomDisruptionData
  | StationClosureDisruptionData;
// | NoCityLoopDisruptionData
// | BusReplacementsDisruptionData
// | etc.

export const disruptionDataBson = z.union([
  CustomDisruptionData.bson,
  StationClosureDisruptionData.bson,
  // NoCityLoopDisruptionData.bson,
  // BusReplacementsDisruptionData.bson,
  // etc.
]);
