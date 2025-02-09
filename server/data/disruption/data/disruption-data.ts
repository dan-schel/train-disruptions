import { StationClosureDisruptionData } from "./station-closure";

/**
 * Stores the data inherent to this particular type of disruption.
 *
 * (All implementations of DisruptionDataBase.)
 */
export type DisruptionData = StationClosureDisruptionData; // | NoCityLoopDisruptionData | BusReplacementsDisruptionData | etc.

export const disruptionDataBson = StationClosureDisruptionData.bson; // z.union([StationClosureDisruptionData.bson, NoCityLoopDisruptionData.bson, BusReplacementsDisruptionData.bson, etc.]);
