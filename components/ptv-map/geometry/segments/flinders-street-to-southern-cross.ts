import { curve, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/** South-west corner of the city loop from Flinders Street to Southern Cross. */
export function flindersStreetToSouthernCross(lineNumber: number): Path[] {
  const flindersStreetPos = loop.fssCoords(lineNumber);
  const southernCrossPos = loop.southernCrossCoords(lineNumber);

  const radius = loop.radius(lineNumber);

  const flindersStreetToCorner = {
    min: flindersStreetPos.min.x - southernCrossPos.min.x - radius,
    max: flindersStreetPos.max.x - southernCrossPos.max.x - radius,
  };

  const cornerToSouthernCross = {
    min: flindersStreetPos.min.y - southernCrossPos.min.y - radius,
    max: flindersStreetPos.max.y - southernCrossPos.max.y - radius,
  };

  return [
    // FLINDERS_STREET
    straight(flindersStreetToCorner),
    curve({ radius: radius, angle: 90 }),
    straight(cornerToSouthernCross),
    // SOUTHERN_CROSS
  ];
}
