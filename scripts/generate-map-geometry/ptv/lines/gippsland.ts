import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flindersStreetToRichmond } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import {
  defaultRadius,
  standardDiagonal,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  caulfieldToClayton,
  claytonToDandenong,
  dandenongToHallamCurve,
  hallamCurveGippland,
  hallamToPakenham,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "@/scripts/generate-map-geometry/ptv/utils-shared-corridors";
import { GIPPSLAND as node } from "@/shared/map-node-ids";

const eastPakenhamToCurve = flexi(10, 25);
const bairnsdaleStraight = flexi(60, 120);

/** The Gippsland line (colored purple on the map). */
export const gippsland = new LineBlueprint({
  origin: loop.pos.southernCross(loop.line.crossCity),
  angle: 45,
  color: "purple",

  path: new PathBlueprint()
    .nodes([node.SOUTHERN_CROSS])
    .add(flindersStreetToSouthernCross(loop.line.regional, true).reverse())
    .nodes([node.FLINDERS_STREET])
    .add(flindersStreetToRichmond(loop.line.regional))
    .nodes([node.RICHMOND])
    .straight(richmondToSouthYarra)
    .nodes([node.SOUTH_YARRA])
    .straight(southYarraToCaulfield)
    .nodes([
      node.HAWKSBURN,
      node.TOORAK,
      node.ARMADALE,
      node.MALVERN,
      node.CAULFIELD,
    ])
    .straight(caulfieldToClayton)
    .nodes([
      node.CARNEGIE,
      node.MURRUMBEENA,
      node.HUGHESDALE,
      node.OAKLEIGH,
      node.HUNTINGDALE,
      node.CLAYTON,
    ])
    .straight(claytonToDandenong)
    .nodes([
      node.WESTALL,
      node.SPRINGVALE,
      node.SANDOWN_PARK,
      node.NOBLE_PARK,
      node.YARRAMAN,
      node.DANDENONG,
    ])
    .straight(dandenongToHallamCurve)
    .curve(hallamCurveGippland, -45)
    .straight(hallamToPakenham)
    .nodes([
      node.HALLAM,
      node.NARRE_WARRAN,
      node.BERWICK,
      node.BEACONSFIELD,
      node.OFFICER,
      node.CARDINIA_ROAD,
      node.PAKENHAM,
    ])
    .straight(pakenhamToEastPakenham)
    .nodes([node.EAST_PAKENHAM])
    .straight(eastPakenhamToCurve)
    .curve(defaultRadius, -45)
    .straight(standardDiagonal)
    .curve(defaultRadius, -45)
    .straight(bairnsdaleStraight)
    .nodes([
      node.NAR_NAR_GOON,
      node.TYNONG,
      node.GARFIELD,
      node.BUNYIP,
      node.LONGWARRY,
      node.DROUIN,
      node.WARRAGUL,
      node.YARRAGON,
      node.TRAFALGAR,
      node.MOE,
      node.MORWELL,
      node.TRARALGON,
      node.ROSEDALE,
      node.SALE,
      node.STRATFORD,
      node.BAIRNSDALE,
    ])
    .terminus(),
});
