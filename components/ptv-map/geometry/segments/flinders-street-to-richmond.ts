import { FlexiPoint } from "../../lib/flexi-point";
import { Path } from "../../lib/path/path";
import { diagonal, lineGap, long45, short45 } from "../utils";
import * as loop from "../utils-city-loop";

const innerRadius = 15;
const flindersStreetStraight = 40;
const richmondStraight = 10;

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
    .plus({ x: radius(lineNumber) * long45, y: radius(lineNumber) * short45 })
    .plus({ x: richmondStraight * diagonal, y: richmondStraight * diagonal });
}

function radius(lineNumber: loop.LineNumber): number {
  return innerRadius + (6 - lineNumber) * lineGap;
}
