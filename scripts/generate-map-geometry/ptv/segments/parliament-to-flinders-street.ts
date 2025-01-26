import { flexi } from "../../lib/dimensions/flexi-length";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import * as loop from "../utils-city-loop";

const radiusReduction = flexi(5);

/**
 * South-east corner of the city loop from Parliament to Flinders Street. Does
 * not include portals to Richmond or Jolimont.
 */
export function parliamentToFlindersStreet(
  lineNumber: loop.LineNumber,
): PathBlueprint {
  const parliamentPos = loop.pos.parliament(lineNumber);
  const flindersStreetPos = loop.pos.flindersStreet(lineNumber);

  const radius = loop.radius(lineNumber).minus(radiusReduction);

  return new PathBlueprint()
    .straight(parliamentPos.verticalDistanceTo(flindersStreetPos).minus(radius))
    .curve(radius, 90)
    .straight(
      parliamentPos.horizontalDistanceTo(flindersStreetPos).minus(radius),
    );
}
