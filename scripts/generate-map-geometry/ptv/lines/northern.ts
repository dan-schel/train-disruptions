import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flagstaffToParliament } from "@/scripts/generate-map-geometry/ptv/segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-southern-cross";
import { northMelbourneLoopPortal } from "@/scripts/generate-map-geometry/ptv/segments/north-melbourne-loop-portal";
import { northMelbourneToFootscray } from "@/scripts/generate-map-geometry/ptv/segments/north-melbourne-to-footscray";
import { parliamentToFlindersStreet } from "@/scripts/generate-map-geometry/ptv/segments/parliament-to-flinders-street";
import { defaultRadius } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  broadmeadowsStraight,
  craigieburnStraight,
  newmarketCurveCraigieburn,
  newmarketStraight,
  sunburyStraight,
  sunshineCurvesSunbury,
  sunshineExitDiagonal,
  sunshineJunctionDiagonal,
  tottenhamStraight,
  watergardensStraight,
} from "@/scripts/generate-map-geometry/ptv/utils-shared-corridors";
import { NORTHERN as node } from "@/shared/map-node-ids";

const upfieldJunctionStraight = flexi(5);
const macaulayStraight = flexi(10);
const brunswickStraight = flexi(30, 60);
const upfieldStraight = flexi(25, 50);

/**
 * The Craigieburn, Sunbury, and Upfield lines, a.k.a. the "Northern group"
 * (colored yellow on the map).
 */
export const northern = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.northern),
  angle: 180,
  color: "yellow",

  path: new PathBlueprint()
    .node(node.FLINDERS_STREET_DIRECT)
    .add(flindersStreetToSouthernCross(0, false))
    .node(node.SOUTHERN_CROSS)
    .add(
      northMelbourneLoopPortal(
        new PathBlueprint()
          .node(node.FLAGSTAFF)
          .add(flagstaffToParliament(0, node.MELBOURNE_CENTRAL))
          .node(node.PARLIAMENT)
          .add(parliamentToFlindersStreet(0))
          .node(node.FLINDERS_STREET_LOOP),
      ),
    )
    .split({
      split: new PathBlueprint()
        .straight(upfieldJunctionStraight)
        .curve(defaultRadius, 45)
        .straight(macaulayStraight)
        .curve(defaultRadius, 45)
        .straight(brunswickStraight)
        .curve(defaultRadius, -45)
        .straight(upfieldStraight)
        .node(node.UPFIELD)
        .terminus(),
    })
    .split({
      split: new PathBlueprint()
        .straight(newmarketStraight)
        .curve(newmarketCurveCraigieburn, 45)
        // TODO: The Flemington Racecourse line branches off here. Not sure
        // whether we need to show it or not.
        .straight(broadmeadowsStraight)
        .node(node.BROADMEADOWS)
        .straight(craigieburnStraight)
        .node(node.CRAIGIEBURN),
    })
    .add(northMelbourneToFootscray("sunbury"))
    .node(node.FOOTSCRAY)
    .straight(tottenhamStraight)
    .node(node.SUNSHINE_JUNCTION)
    .curve(sunshineCurvesSunbury, 45)
    .straight(sunshineJunctionDiagonal)
    .node(node.SUNSHINE)
    .straight(sunshineExitDiagonal)
    .curve(sunshineCurvesSunbury, 45)
    .straight(watergardensStraight)
    .node(node.WATERGARDENS)
    .straight(sunburyStraight)
    .node(node.SUNBURY),
});
