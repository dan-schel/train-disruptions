import { FlexiPoint } from "../lib/flexi";
import { lineGap } from "./utils";

const innerRadius = 15;

const southEdgeY = 0;
const westEdgeX = -55;
const northEdgeY = -60;
const eastEdgeX = 35;

const flindersStreetX = 0;
const southernCrossY = -25;
const flagstaffX = -40;
const melbourneCentralX = 0;
const parliamentY = -45;

/** The radius to use, based on the line number index from the center. */
export function radius(lineNumber: number) {
  return innerRadius + lineNumber * lineGap;
}

/**
 * The position of Flinders Street, based on the line number index from the
 * center.
 */
export function flindersStreetCoords(lineNumber: number): FlexiPoint {
  return FlexiPoint.formalize({
    x: flindersStreetX,
    y: southEdgeY + lineNumber * lineGap,
  });
}

/**
 * The position of Southern Cross, based on the line number index from the
 * center.
 */
export function southernCrossCoords(lineNumber: number): FlexiPoint {
  return FlexiPoint.formalize({
    x: westEdgeX - lineNumber * lineGap,
    y: southernCrossY,
  });
}

/** The position of Flagstaff, based on the line number index from the center. */
export function flagstaffCoords(lineNumber: number): FlexiPoint {
  return FlexiPoint.formalize({
    x: flagstaffX,
    y: northEdgeY - lineNumber * lineGap,
  });
}

/**
 * The position of Melbourne Central, based on the line number index from the
 * center.
 */
export function melbourneCentralCoords(lineNumber: number): FlexiPoint {
  return FlexiPoint.formalize({
    x: melbourneCentralX,
    y: northEdgeY - lineNumber * lineGap,
  });
}

/** The position of Parliament, based on the line number index from the center. */
export function parliamentCoords(lineNumber: number): FlexiPoint {
  return FlexiPoint.formalize({
    x: eastEdgeX + lineNumber * lineGap,
    y: parliamentY,
  });
}
