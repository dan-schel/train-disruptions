import { LineShapeNode } from "@/server/data/line/line-routes/line-shape";
import { StationPair } from "@/server/data/line/line-routes/station-pair";
import {
  FLAGSTAFF,
  FLINDERS_STREET,
  MELBOURNE_CENTRAL,
  PARLIAMENT,
  SOUTHERN_CROSS,
} from "@/shared/station-ids";

const TheCityStations = [
  FLINDERS_STREET,
  SOUTHERN_CROSS,
  FLAGSTAFF,
  MELBOURNE_CENTRAL,
  PARLIAMENT,
];

export function isPartOfTheCity(stationId: number) {
  return TheCityStations.includes(stationId);
}

/** Check if the station pair includes exactly one station that is part of the city loop */
export function isOnCityBoundary({ a, b }: StationPair) {
  return (
    (isPartOfTheCity(a) && !isPartOfTheCity(b)) ||
    (!isPartOfTheCity(a) && isPartOfTheCity(b))
  );
}

export function doesLineRunThroughCityLoop(
  lineShapeNodes: readonly LineShapeNode[],
) {
  return lineShapeNodes.includes("the-city");
}
