import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import {
  diagonal,
  lineGap,
  long45,
  short45,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

const innerRadius = flexi(15);
const flindersStreetStraight = flexi(40);
const richmondStraight = flexi(5);

/**
 * The direct path from Flinders Street to Richmond. Does not include city loop
 * portals.
 */
export function flindersStreetToRichmond(
  flindersStreetLineNumber: loop.LineNumber,
): PathBlueprint {
  return new PathBlueprint()
    .straight(flindersStreetStraight)
    .curve(radius(flindersStreetLineNumber), 45)
    .straight(richmondStraight);
}

export function richmondPos(lineNumber: loop.LineNumber): FlexiPoint {
  return loop.pos
    .flindersStreet(lineNumber)
    .plus({ x: flindersStreetStraight })
    .plus({
      x: radius(lineNumber).times(long45),
      y: radius(lineNumber).times(short45),
    })
    .plus({
      x: richmondStraight.times(diagonal),
      y: richmondStraight.times(diagonal),
    });
}

function radius(lineNumber: loop.LineNumber) {
  return innerRadius.plus(lineGap.times(6 - lineNumber));
}
