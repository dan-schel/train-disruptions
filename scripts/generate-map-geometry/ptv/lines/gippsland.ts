import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
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
import { LineBuilder } from "@/scripts/generate-map-geometry/lib/line-builder";
import {
  curve,
  straight,
} from "@/scripts/generate-map-geometry/lib/segment-instructions";

const eastPakenhamCurve = flexi(10, 25);
const bairnsdaleStraight = flexi(60, 120);
const loopLine = loop.line.regional;

/** The Gippsland line (colored purple on the map). */
export const gippsland = new LineBuilder(
  node.SOUTHERN_CROSS,

  // Line does a weird curve near the Southern Cross interchange marker, so it's
  // start position is actually the cross-city group (and at 45 degrees).
  loop.pos.southernCross(loop.line.crossCity),
  45,

  "purple",
)
  .to(node.FLINDERS_STREET, [
    ...flindersStreetToSouthernCross(loopLine, true).reverse(),
  ])
  .to(node.RICHMOND, flindersStreetToRichmond(loopLine))
  .to(node.SOUTH_YARRA, [straight(richmondToSouthYarra)])
  .to(node.CAULFIELD, [straight(southYarraToCaulfield)])
  .to(node.CLAYTON, [straight(caulfieldToClayton)])
  .to(node.DANDENONG, [straight(claytonToDandenong)])
  .to(node.PAKENHAM, [
    straight(dandenongToHallamCurve),
    curve(hallamCurveGippland, -45),
    straight(hallamToPakenham),
  ])
  .to(node.EAST_PAKENHAM, [straight(pakenhamToEastPakenham)])
  .to(node.BAIRNSDALE, [
    straight(eastPakenhamCurve),
    curve(defaultRadius, -45),
    straight(standardDiagonal),
    curve(defaultRadius, -45),
    straight(bairnsdaleStraight),
  ]);
