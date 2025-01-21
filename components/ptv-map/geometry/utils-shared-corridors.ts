import { defaultRadius, lineGap } from "./utils";

export const richmondToSouthYarra = 20;
export const southYarraToCaulfield = 115;
export const caulfieldToClayton = 115;
export const claytonToDandenong = 115;
export const dandenongToHallamCurve = 20;
export const hallamToPakenham = 215;
export const pakenhamToEastPakenham = 20;

export const hallamCurvePakenham = defaultRadius;
export const hallamCurveGippland = defaultRadius + lineGap;
// etc.

// Can also put coordinated radii here, e.g. at Dandenong, where the Gippsland
// line needs +5 extra radius.
