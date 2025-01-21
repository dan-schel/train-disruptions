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

export const newmarketStraight = 85;
export const newmarketCurveCraigieburn = defaultRadius;
export const newmarketCurveSeymour = defaultRadius + lineGap;
export const broadmeadowsStraight = 150;
export const craigieburnStraight = 45;

export const tottenhamStraight = 135;
export const sunshineDiagonals = 5;
export const sunshineCurvesSunbury = defaultRadius;
export const sunshineCurvesBendigo = defaultRadius + lineGap;
export const watergardensStraight = 65;
export const sunburyStraight = 30;
// etc.

// Can also put coordinated radii here, e.g. at Dandenong, where the Gippsland
// line needs +5 extra radius.
