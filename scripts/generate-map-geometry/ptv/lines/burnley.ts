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
    .nodes([node.FLINDERS_STREET_LOOP])
    .add(flindersStreetToSouthernCross(2, false))
    .nodes([node.SOUTHERN_CROSS])
    .add(southernCrossToFlagstaff(2))
    .nodes([node.FLAGSTAFF])
    .add(flagstaffToParliament(2, node.MELBOURNE_CENTRAL))
    .nodes([node.PARLIAMENT])
    .add(
      richmondLoopPortal(
        loop.line.burnley,
        loopPortalStraight,
        node.FLINDERS_STREET_DIRECT,
      ),
    )
    .nodes([node.RICHMOND])
    .curve(defaultRadius, -45)
    .straight(burnleyStraight)
    .nodes([node.EAST_RICHMOND, node.BURNLEY])
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(glenIrisStraight)
        .curve(defaultRadius, -45)
        .straight(glenWaverleyStraight)
        .nodes([
          node.HEYINGTON,
          node.KOOYONG,
          node.TOORONGA,
          node.GARDINER,
          node.GLEN_IRIS,
          node.DARLING,
          node.EAST_MALVERN,
          node.HOLMESGLEN,
          node.JORDANVILLE,
          node.MOUNT_WAVERLEY,
          node.SYNDAL,
          node.GLEN_WAVERLEY,
        ])
        .terminus(),
    })
    .curve(defaultRadius, -45)
    .straight(camberwellStraight)
    .nodes([node.HAWTHORN, node.GLENFERRIE, node.AUBURN, node.CAMBERWELL])
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(riversdaleStraight)
        .curve(defaultRadius, 45)
        .straight(alameinStraight)
        .nodes([
          node.RIVERSDALE,
          node.WILLISON,
          node.HARTWELL,
          node.BURWOOD,
          node.ASHBURTON,
          node.ALAMEIN,
        ])
        .terminus(),
    })
    .straight(laburnumStraight)
    .curve(defaultRadius, 45)
    .straight(ringwoodStraight)
    .nodes([
      node.EAST_CAMBERWELL,
      node.CANTERBURY,
      node.CHATHAM,
      node.UNION,
      node.BOX_HILL,
      node.LABURNUM,
      node.BLACKBURN,
      node.NUNAWADING,
      node.MITCHAM,
      node.HEATHERDALE,
      node.RINGWOOD,
    ])
    .split({
      split: new PathBlueprint()
        .curve(defaultRadius, 45)
        .straight(belgraveStraight)
        .nodes([
          node.HEATHMONT,
          node.BAYSWATER,
          node.BORONIA,
          node.FERNTREE_GULLY,
          node.UPPER_FERNTREE_GULLY,
          node.UPWEY,
          node.TECOMA,
          node.BELGRAVE,
        ])
        .terminus(),
    })
    .straight(lilydaleStraight)
    .nodes([node.RINGWOOD_EAST, node.CROYDON, node.MOOROOLBARK, node.LILYDALE])
    .terminus(),
});
