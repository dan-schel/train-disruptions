import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  broadmeadows,
  craigieburn,
  flagstaff,
  flindersStreet,
  footscray,
  northMelbourne,
  parliament,
  southernCross,
  sunbury,
  sunshine,
  watergardens,
} from "../interchanges";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { northMelbourneLoopPortal } from "../segments/north-melbourne-loop-portal";
import { northMelbourneToFootscray } from "../segments/north-melbourne-to-footscray";
import { parliamentToFlindersStreet } from "../segments/parliament-to-flinders-street";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";
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
} from "../utils-shared-corridors";

const upfieldJunctionStraight = 5;
const macaulayStraight = 10;
const brunswickStraight = 60;
const upfieldStraight = 60;

/**
 * The Craigieburn, Sunbury, and Upfield lines, a.k.a. the "Northern group"
 * (colored yellow on the map).
 */
export const northern = new Line({
  origin: loop.pos.flindersStreet(loop.line.northern),
  angle: 180,
  color: "yellow",

  path: new Path()
    .station(flindersStreet.point("northern-direct"))
    .add(flindersStreetToSouthernCross(0, false))
    .station(southernCross.point("northern"))
    .add(
      northMelbourneLoopPortal(
        new Path()
          .station(flagstaff.point("northern"))
          .add(flagstaffToParliament(0, "northern"))
          .station(parliament.point("northern"))
          .add(parliamentToFlindersStreet(0))
          .station(flindersStreet.point("northern-loop")),
      ),
    )
    .station(northMelbourne.point("northern"))
    .split({
      split: new Path()
        .straight(upfieldJunctionStraight)
        .curve(defaultRadius, 45)
        .straight(macaulayStraight)
        .curve(defaultRadius, 45)
        .straight(brunswickStraight)
        .curve(defaultRadius, -45)
        .straight(upfieldStraight)
        .terminus(),
    })
    .split({
      split: new Path()
        .straight(newmarketStraight)
        .curve(newmarketCurveCraigieburn, 45)
        // TODO: The Flemington Racecourse line branches off here. Not sure
        // whether we need to show it or not.
        .straight(broadmeadowsStraight)
        .station(broadmeadows.point("craigieburn"))
        .straight(craigieburnStraight)
        .station(craigieburn.point("craigieburn")),
    })
    .add(northMelbourneToFootscray("sunbury"))
    .station(footscray.point("sunbury"))
    .straight(tottenhamStraight)
    .curve(sunshineCurvesSunbury, 45)
    .straight(sunshineJunctionDiagonal)
    .station(sunshine.point("sunbury"))
    .straight(sunshineExitDiagonal)
    .curve(sunshineCurvesSunbury, 45)
    .straight(watergardensStraight)
    .station(watergardens.point("sunbury"))
    .straight(sunburyStraight)
    .station(sunbury.point("sunbury")),
});
