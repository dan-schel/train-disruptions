import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBuilder } from "@/scripts/generate-map-geometry/lib/line-builder";
import {
  curve,
  straight,
  turnBack,
} from "@/scripts/generate-map-geometry/lib/segment-instructions";
import { flagstaffToMelbourneCentral } from "@/scripts/generate-map-geometry/ptv/segments/flagstaff-to-melbourne-central";
import { flindersStreetToRichmond } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import { melbourneCentralToParliament } from "@/scripts/generate-map-geometry/ptv/segments/melbourne-central-to-parliament";
import { parliamentToRichmond } from "@/scripts/generate-map-geometry/ptv/segments/parliament-to-richmond";
import { southernCrossToFlagstaff } from "@/scripts/generate-map-geometry/ptv/segments/southern-cross-to-flagstaff";
import { defaultRadius } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  caulfieldToClayton,
  claytonToDandenong,
  dandenongToHallamCurve,
  hallamCurvePakenham,
  hallamToPakenham,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "@/scripts/generate-map-geometry/ptv/utils-shared-corridors";
import { DANDENONG as node } from "@/shared/map-node-ids";

const loopPortalStraight = flexi(20);
const cranbourneStraight = flexi(30, 45);
const loopLine = loop.line.dandenong;

/**
 * The Cranbourne and Pakenham lines, a.k.a. the "Dandenong group" (colored
 * light blue/cyan on the map).
 */
export const dandenong = new LineBuilder(
  node.FLINDERS_STREET_LOOP,
  loop.pos.flindersStreet(loopLine),
  180,
  "cyan",
)
  .to(node.SOUTHERN_CROSS, flindersStreetToSouthernCross(loopLine, false))
  .to(node.FLAGSTAFF, southernCrossToFlagstaff(loopLine))
  .to(node.MELBOURNE_CENTRAL, flagstaffToMelbourneCentral(loopLine))
  .to(node.PARLIAMENT, melbourneCentralToParliament(loopLine))
  .to(node.RICHMOND, parliamentToRichmond(loopLine, loopPortalStraight))
  .split((l) =>
    l.to(node.FLINDERS_STREET_DIRECT, [
      turnBack(),
      ...flindersStreetToRichmond(loopLine).reverse(),
    ]),
  )
  .to(node.SOUTH_YARRA, [straight(richmondToSouthYarra)])
  .to(node.CAULFIELD, [straight(southYarraToCaulfield)])
  .to(node.CLAYTON, [straight(caulfieldToClayton)])
  .to(node.DANDENONG, [straight(claytonToDandenong)])
  .split((l) =>
    l.to(node.CRANBOURNE, [
      curve(defaultRadius, 45),
      straight(cranbourneStraight),
    ]),
  )
  .to(node.PAKENHAM, [
    straight(dandenongToHallamCurve),
    curve(hallamCurvePakenham, -45),
    straight(hallamToPakenham),
  ])
  .to(node.EAST_PAKENHAM, [straight(pakenhamToEastPakenham)]);
