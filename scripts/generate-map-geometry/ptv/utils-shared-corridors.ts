import { interchangeEdgeOffset } from "../../../components/map/renderer/utils";
import { FlexiLength } from "../lib/dimensions/flexi-length";
import { defaultRadius, diagonal, lineGap, long45, short45 } from "./utils";

export const richmondToSouthYarra = new FlexiLength(20, 20);
export const southYarraToCaulfield = new FlexiLength(30, 60);
export const caulfieldToClayton = new FlexiLength(30, 60);
export const claytonToDandenong = new FlexiLength(30, 60);
export const dandenongToHallamCurve = 20;
export const hallamToPakenham = new FlexiLength(30, 80);
export const pakenhamToEastPakenham = new FlexiLength(15, 20);

export const hallamCurvePakenham = defaultRadius;
export const hallamCurveGippland = hallamCurvePakenham + lineGap;

export const newmarketStraight = 40;
export const newmarketCurveCraigieburn = defaultRadius;
export const newmarketCurveSeymour = newmarketCurveCraigieburn + lineGap;
export const broadmeadowsStraight = new FlexiLength(40, 80);
export const craigieburnStraight = new FlexiLength(25, 50);

export const tottenhamStraight = new FlexiLength(30, 60);
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
export const deerParkStraight = new FlexiLength(50, 60).minus(
  sunshineJunctionStraight,
);
export const watergardensStraight = new FlexiLength(25, 50);
export const sunburyStraight = new FlexiLength(20, 30);
