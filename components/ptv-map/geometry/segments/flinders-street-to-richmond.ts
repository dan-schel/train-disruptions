import { FlexiPoint } from "../../lib/flexi";
import { curve, Path, straight } from "../../lib/geometry";
import { diagonal, lineGap, long45, short45 } from "../utils";
import * as loop from "../utils-city-loop";

const innerRadius = 15;

export const flindersStreetStraight = 40;
export const richmondStraight = 10;

export function radius(lineNumber: loop.LineNumber): number {
  return innerRadius + (6 - lineNumber) * lineGap;
}

export function richmondPos(lineNumber: loop.LineNumber): FlexiPoint {
  return loop.pos
    .flindersStreet(lineNumber)
    .plus({ x: flindersStreetStraight })
    .plus({ x: radius(lineNumber) * long45, y: radius(lineNumber) * short45 })
    .plus({ x: richmondStraight * diagonal, y: richmondStraight * diagonal });
}

// TODO: [DS] Could this be calculated automatically, e.g. a Path.reverse()
// method?
export function reverse(flindersStreetLineNumber: loop.LineNumber): Path[] {
  return [
    // Richmond
    straight(richmondStraight),
    curve({ radius: radius(flindersStreetLineNumber), angle: -45 }),
    straight(flindersStreetStraight),
    // Flinders Street
  ];
}

/**
 * The direct path from Flinders Street to Richmond. Does not include city loop
 * portals.
 */
export function flindersStreetToRichmond(
  flindersStreetLineNumber: loop.LineNumber,
): Path[] {
  return [
    // Flinders Street
    straight(flindersStreetStraight),
    curve({ radius: radius(flindersStreetLineNumber), angle: 45 }),
    straight(richmondStraight),
    // Richmond
  ];
}
