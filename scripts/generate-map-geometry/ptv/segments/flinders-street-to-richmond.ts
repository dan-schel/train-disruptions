import { flexi } from "../../lib/dimensions/flexi-length";
import { FlexiPoint } from "../../lib/dimensions/flexi-point";
import { Path } from "../../lib/path/path";
import { diagonal, lineGap, long45, short45 } from "../utils";
import * as loop from "../utils-city-loop";

const innerRadius = flexi(15);
const flindersStreetStraight = flexi(40);
const richmondStraight = flexi(5);

/**
 * The direct path from Flinders Street to Richmond. Does not include city loop
 * portals.
 */
export function flindersStreetToRichmond(
  flindersStreetLineNumber: loop.LineNumber,
): Path {
  return new Path()
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
