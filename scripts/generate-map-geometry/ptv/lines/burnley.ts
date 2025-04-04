import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flagstaffToParliament } from "@/scripts/generate-map-geometry/ptv/segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "@/scripts/generate-map-geometry/ptv/segments/richmond-loop-portal";
import { southernCrossToFlagstaff } from "@/scripts/generate-map-geometry/ptv/segments/southern-cross-to-flagstaff";
import { defaultRadius } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import { BURNLEY as node } from "@/shared/map-node-ids";

const loopPortalStraight = flexi(25);
const burnleyStraight = flexi(20, 40);
const glenIrisStraight = flexi(35, 70);
const glenWaverleyStraight = flexi(45, 90);
const camberwellStraight = flexi(25, 50);
const riversdaleStraight = flexi(15, 30);
const alameinStraight = flexi(25, 50);
const laburnumStraight = flexi(35, 70);
const ringwoodStraight = flexi(30, 60);
const belgraveStraight = flexi(40, 80);
const lilydaleStraight = flexi(40, 80);

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.burnley),
  angle: 180,
  color: "blue",

  path: new PathBlueprint()
    .node(node.FLINDERS_STREET_LOOP)
    .add(flindersStreetToSouthernCross(2, false))
    .node(node.SOUTHERN_CROSS)
    .add(southernCrossToFlagstaff(2))
    .node(node.FLAGSTAFF)
    .add(flagstaffToParliament(2, node.MELBOURNE_CENTRAL))
    .node(node.PARLIAMENT)
    .add(
      richmondLoopPortal(
        loop.line.burnley,
        loopPortalStraight,
        node.RICHMOND,
        node.FLINDERS_STREET_DIRECT,
      ),
    )
    .curve(defaultRadius, -45)
    .straight(burnleyStraight)
    .node(node.BURNLEY)
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(glenIrisStraight)
        .curve(defaultRadius, -45)
        .straight(glenWaverleyStraight)
        .node(node.GLEN_WAVERLEY)
        .terminus(),
    })
    .curve(defaultRadius, -45)
    .straight(camberwellStraight)
    .node(node.CAMBERWELL)
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(riversdaleStraight)
        .curve(defaultRadius, 45)
        .straight(alameinStraight)
        .node(node.ALAMEIN)
        .terminus(),
    })
    .straight(laburnumStraight)
    .curve(defaultRadius, 45)
    .straight(ringwoodStraight)
    .node(node.RINGWOOD)
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(belgraveStraight)
        .node(node.BELGRAVE)
        .terminus(),
    })
    .straight(lilydaleStraight)
    .node(node.LILYDALE)
    .terminus(),
});
