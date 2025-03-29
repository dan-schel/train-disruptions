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
    .nodes([node.FLINDERS_STREET_LOOP])
    .add(flindersStreetToSouthernCross(1, false))
    .nodes([node.SOUTHERN_CROSS])
    .add(southernCrossToFlagstaff(1))
    .nodes([node.FLAGSTAFF])
    .add(flagstaffToParliament(1, node.MELBOURNE_CENTRAL))
    .nodes([node.PARLIAMENT])
    .add(jolimontLoopPortal())
    .nodes([node.JOLIMONT])
    .straight(cliftonHillStraight)
    .nodes([
      node.WEST_RICHMOND,
      node.NORTH_RICHMOND,
      node.COLLINGWOOD,
      node.VICTORIA_PARK,
      node.CLIFTON_HILL,
    ])
    .split({
      split: new PathBlueprint()
        .straight(heidelbergStraight)
        .curve(defaultRadius, 45)
        .straight(hurstbridgeStraight)
        .nodes([
          node.WESTGARTH,
          node.DENNIS,
          node.FAIRFIELD,
          node.ALPHINGTON,
          node.DAREBIN,
          node.IVANHOE,
          node.EAGLEMONT,
          node.HEIDELBERG,
          node.ROSANNA,
          node.MACLEOD,
          node.WATSONIA,
          node.GREENSBOROUGH,
          node.MONTMORENCY,
          node.ELTHAM,
          node.DIAMOND_CREEK,
          node.WATTLE_GLEN,
          node.HURSTBRIDGE,
        ])
        .terminus(),
    })
    .curve(defaultRadius, -45)
    .straight(prestonStraight)
    .curve(defaultRadius, 45)
    .straight(standardDiagonal)
    .curve(defaultRadius, 45)
    .straight(merndaStraight)
    .nodes([
      node.RUSHALL,
      node.MERRI,
      node.NORTHCOTE,
      node.CROXTON,
      node.THORNBURY,
      node.BELL,
      node.PRESTON,
      node.REGENT,
      node.RESERVOIR,
      node.RUTHVEN,
      node.KEON_PARK,
      node.THOMASTOWN,
      node.LALOR,
      node.EPPING,
      node.SOUTH_MORANG,
      node.MIDDLE_GORGE,
      node.HAWKSTOWE,
      node.MERNDA,
    ])
    .terminus(),
});
