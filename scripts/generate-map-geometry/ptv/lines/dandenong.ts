import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flagstaffToParliament } from "@/scripts/generate-map-geometry/ptv/segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "@/scripts/generate-map-geometry/ptv/segments/richmond-loop-portal";
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

/**
 * The Cranbourne and Pakenham lines, a.k.a. the "Dandenong group" (colored
 * light blue/cyan on the map).
 */
export const dandenong = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.dandenong),
  angle: 180,
  color: "cyan",

  path: new PathBlueprint()
    .node(node.FLINDERS_STREET_LOOP)
    .add(flindersStreetToSouthernCross(3, false))
    .node(node.SOUTHERN_CROSS)
    .add(southernCrossToFlagstaff(3))
    .node(node.FLAGSTAFF)
    .add(flagstaffToParliament(3, node.MELBOURNE_CENTRAL))
    .node(node.PARLIAMENT)
    .add(
      richmondLoopPortal(
        loop.line.dandenong,
        loopPortalStraight,
        node.RICHMOND,
        node.FLINDERS_STREET_DIRECT,
      ),
    )
    .straight(richmondToSouthYarra)
    .node(node.SOUTH_YARRA)
    .straight(southYarraToCaulfield)
    .node(node.CAULFIELD)
    .straight(caulfieldToClayton)
    .node(node.CLAYTON)
    .straight(claytonToDandenong)
    .node(node.DANDENONG)
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(cranbourneStraight)
        .node(node.CRANBOURNE),
    })
    .straight(dandenongToHallamCurve)
    .curve(hallamCurvePakenham, -45)
    .straight(hallamToPakenham)
    .node(node.PAKENHAM)
    .straight(pakenhamToEastPakenham)
    .node(node.EAST_PAKENHAM),
});
