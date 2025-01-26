import { interchangeEdgeOffset } from "../../../components/map/renderer/utils";
import { defaultRadius, diagonal, lineGap, long45, short45 } from "./utils";

export const richmondToSouthYarra = 20;
export const southYarraToCaulfield = 60;
export const caulfieldToClayton = 60;
export const claytonToDandenong = 60;
export const dandenongToHallamCurve = 20;
export const hallamToPakenham = 80;
export const pakenhamToEastPakenham = 20;

export const hallamCurvePakenham = defaultRadius;
export const hallamCurveGippland = hallamCurvePakenham + lineGap;

export const newmarketStraight = 40;
export const newmarketCurveCraigieburn = defaultRadius;
export const newmarketCurveSeymour = newmarketCurveCraigieburn + lineGap;
export const broadmeadowsStraight = 80;
export const craigieburnStraight = 45;

export const tottenhamStraight = 60;
export const sunshineJunctionDiagonal = 0;
export const sunshineExitDiagonal = 5;
export const sunshineCurvesSunbury = defaultRadius;
export const sunshineCurvesBendigo = sunshineCurvesSunbury + lineGap;
export const sunshineJunctionStraight =
  long45 * sunshineCurvesSunbury +
  sunshineJunctionDiagonal * diagonal +
  lineGap +
  short45 * sunshineCurvesSunbury +
  sunshineJunctionDiagonal * diagonal -
  interchangeEdgeOffset;
export const deerParkStraight = 60 - sunshineJunctionStraight;
export const watergardensStraight = 50;
export const sunburyStraight = 30;
