import { FlexiLength } from "../lib/dimensions/flexi-length";
import { FlexiPoint } from "../lib/dimensions/flexi-point";
import { lineGap } from "./utils";

const innerRadius = 15;

const southEdgeY = 0;
const westEdgeX = -55;
const northEdgeY = -60;
const eastEdgeX = 35;

const flindersStreetX = 0;
const southernCrossY = -30;
const flagstaffX = -40;
const melbourneCentralX = 0;
const parliamentY = -45;

export const line = {
  northern: 0,
  cliftonHill: 1,
  burnley: 2,
  dandenong: 3,
  regional: 4,
  crossCity: 5,
  sandringham: 6,
} as const;

export type LineNumber = (typeof line)[keyof typeof line];

/** The radius to use, based on the line number index from the center. */
export function radius(lineNumber: LineNumber) {
  return FlexiLength.formalize(innerRadius + lineNumber * lineGap);
}

export const pos = {
  /**
   * The position of Flinders Street, based on the line number index from the
   * center.
   */
  flindersStreet: (lineNumber: LineNumber) =>
    FlexiPoint.formalize({
      x: flindersStreetX,
      y: southEdgeY + lineNumber * lineGap,
    }),

  /**
   * The position of Southern Cross, based on the line number index from the
   * center.
   */
  southernCross: (lineNumber: LineNumber) =>
    FlexiPoint.formalize({
      x: westEdgeX - lineNumber * lineGap,
      y: southernCrossY,
    }),

  /** The position of Flagstaff, based on the line number index from the center. */
  flagstaff: (lineNumber: LineNumber) =>
    FlexiPoint.formalize({
      x: flagstaffX,
      y: northEdgeY - lineNumber * lineGap,
    }),

  /**
   * The position of Melbourne Central, based on the line number index from the
   * center.
   */
  melbourneCentral: (lineNumber: LineNumber) =>
    FlexiPoint.formalize({
      x: melbourneCentralX,
      y: northEdgeY - lineNumber * lineGap,
    }),

  /** The position of Parliament, based on the line number index from the center. */
  parliament: (lineNumber: LineNumber) =>
    FlexiPoint.formalize({
      x: eastEdgeX + lineNumber * lineGap,
      y: parliamentY,
    }),
};
