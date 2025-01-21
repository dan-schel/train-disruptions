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
} from "../utils-shared-corridors";

const upfieldJunctionStraight = 5;
const macaulayStraight = 10;
const brunswickStraight = 90;
const upfieldStraight = 110;

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
        .straight(upfieldStraight),
    })
    .split({
      split: new Path()
        .straight(newmarketStraight)
        .curve(newmarketCurveCraigieburn, 45)
        .straight(broadmeadowsStraight)
        .station(broadmeadows.point("craigieburn"))
        .straight(craigieburnStraight)
        .station(craigieburn.point("craigieburn")),
    })
    .add(northMelbourneToFootscray("sunbury"))
    .station(footscray.point("sunbury")),
});
