import { curve, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/**
 * South-east corner of the city loop from Parliament to Flinders Street. Does
 * not include portals to Richmond or Jolimont.
 */
export function parliamentToFlindersStreet(lineNumber: number): Path[] {
  const parliamentPos = loop.parliamentCoords(lineNumber);
  const flindersStreetPos = loop.flindersStreetCoords(lineNumber);

  const radius = loop.radius(lineNumber);

  return [
    // Southern Cross
    straight(parliamentPos.verticalDistanceTo(flindersStreetPos).minus(radius)),
    curve({ radius: radius, angle: 90 }),
    straight(
      parliamentPos.horizontalDistanceTo(flindersStreetPos).minus(radius),
    ),
    // Flagstaff
  ];
}
