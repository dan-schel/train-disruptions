import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flagstaffToParliament } from "@/scripts/generate-map-geometry/ptv/segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import { jolimontLoopPortal } from "@/scripts/generate-map-geometry/ptv/segments/jolimont-loop-portal";
import { southernCrossToFlagstaff } from "@/scripts/generate-map-geometry/ptv/segments/southern-cross-to-flagstaff";
import {
  defaultRadius,
  standardDiagonal,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import { CLIFTON_HILL as node } from "@/shared/map-node-ids";

const cliftonHillStraight = flexi(40, 80);
const heidelbergStraight = flexi(40, 80);
const hurstbridgeStraight = flexi(50, 100);
const prestonStraight = flexi(40, 80);
const merndaStraight = flexi(50, 100);

/**
 * The Hurstbridge and Mernda lines, a.k.a. the "Clifton Hill group" (colored
 * red on the map).
 */
export const cliftonHill = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.cliftonHill),
  angle: 180,
  color: "red",

  path: new PathBlueprint()
    .node(node.FLINDERS_STREET_LOOP)
    .add(flindersStreetToSouthernCross(1, false))
    .node(node.SOUTHERN_CROSS)
    .add(southernCrossToFlagstaff(1))
    .node(node.FLAGSTAFF)
    .add(flagstaffToParliament(1, node.MELBOURNE_CENTRAL))
    .node(node.PARLIAMENT)
    .add(jolimontLoopPortal())
    .straight(cliftonHillStraight)
    .node(node.CLIFTON_HILL)
    .split({
      split: new PathBlueprint()
        .straight(heidelbergStraight)
        .curve(defaultRadius, 45)
        .straight(hurstbridgeStraight)
        .node(node.HURSTBRIDGE)
        .terminus(),
    })
    .curve(defaultRadius, -45)
    .straight(prestonStraight)
    .curve(defaultRadius, 45)
    .straight(standardDiagonal)
    .curve(defaultRadius, 45)
    .straight(merndaStraight)
    .node(node.MERNDA)
    .terminus(),
});
