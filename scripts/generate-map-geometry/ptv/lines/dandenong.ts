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
    .nodes([node.FLINDERS_STREET_LOOP])
    .add(flindersStreetToSouthernCross(3, false))
    .nodes([node.SOUTHERN_CROSS])
    .add(southernCrossToFlagstaff(3))
    .nodes([node.FLAGSTAFF])
    .add(flagstaffToParliament(3, node.MELBOURNE_CENTRAL))
    .nodes([node.PARLIAMENT])
    .add(
      richmondLoopPortal(
        loop.line.dandenong,
        loopPortalStraight,
        node.RICHMOND,
        node.FLINDERS_STREET_DIRECT,
      ),
    )
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
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(cranbourneStraight)
        .nodes([node.LYNBROOK, node.MERINDA_PARK, node.CRANBOURNE])
        .terminus(),
    })
    .straight(dandenongToHallamCurve)
    .curve(hallamCurvePakenham, -45)
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
    .terminus(),
});
