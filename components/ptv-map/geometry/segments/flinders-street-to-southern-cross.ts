import { curve, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/** South-west corner of the city loop from Flinders Street to Southern Cross. */
export function flindersStreetToSouthernCross(
  lineNumber: loop.LineNumber,
): Path[] {
  const flindersStreetPos = loop.pos.flindersStreet(lineNumber);
  const southernCrossPos = loop.pos.southernCross(lineNumber);

  const radius = loop.radius(lineNumber);

  return [
    // Flinders Street
    straight(
      flindersStreetPos.horizontalDistanceTo(southernCrossPos).minus(radius),
    ),
    curve({ radius: radius, angle: 90 }),
    straight(
      southernCrossPos.verticalDistanceTo(flindersStreetPos).minus(radius),
    ),
    // Southern Cross
  ];
}
