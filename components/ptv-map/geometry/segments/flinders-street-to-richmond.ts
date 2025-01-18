import { curve, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

/**
 * South-east corner of the city loop from Parliament to Flinders Street. Does
 * not include portals to Richmond or Jolimont.
 */
export function parliamentToFlindersStreet(
  lineNumber: loop.LineNumber,
): Path[] {
  const parliamentPos = loop.pos.parliament(lineNumber);
  const flindersStreetPos = loop.pos.flindersStreet(lineNumber);

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
