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
    .node(node.SOUTHERN_CROSS)
    .add(flindersStreetToSouthernCross(loop.line.regional, true).reverse())
    .node(node.FLINDERS_STREET)
    .add(flindersStreetToRichmond(loop.line.regional))
    .node(node.RICHMOND)
    .straight(richmondToSouthYarra)
    .node(node.SOUTH_YARRA)
    .straight(southYarraToCaulfield)
    .node(node.CAULFIELD)
    .straight(caulfieldToClayton)
    .node(node.CLAYTON)
    .straight(claytonToDandenong)
    .node(node.DANDENONG)
    .straight(dandenongToHallamCurve)
    .curve(hallamCurveGippland, -45)
    .straight(hallamToPakenham)
    .node(node.PAKENHAM)
    .straight(pakenhamToEastPakenham)
    .node(node.EAST_PAKENHAM)
    .straight(eastPakenhamToCurve)
    .curve(defaultRadius, -45)
    .straight(standardDiagonal)
    .curve(defaultRadius, -45)
    .straight(bairnsdaleStraight)
    .node(node.BAIRNSDALE),
});
