import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  flagstaff,
  flindersStreet,
  parliament,
  richmond,
  southernCross,
  burnley as burnleyInterchange,
  camberwell,
  ringwood,
} from "../interchanges";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "../segments/richmond-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";

const burnleyStraight = 60;
const glenIrisStraight = 110;
const glenWaverleyStraight = 180;
const camberwellStraight = 75;
const riversdaleStraight = 40;
const alameinStraight = 110;
const laburnumStraight = 165;
const ringwoodStraight = 140;
const belgraveStraight = 150;
const lilydaleStraight = 125;

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley = new Line({
  origin: loop.pos.flindersStreet(loop.line.burnley),
  angle: 180,
  color: "blue",

  // TODO: [DS] Need a way to specify the stations between defined points, as
  // well as to draw the terminus symbol.
  path: new Path()
    .station(flindersStreet.point("burnley-loop"))
    .add(flindersStreetToSouthernCross(2, false))
    .station(southernCross.point("burnley"))
    .add(southernCrossToFlagstaff(2))
    .station(flagstaff.point("burnley"))
    .add(flagstaffToParliament(2, "burnley"))
    .station(parliament.point("burnley"))
    .add(richmondLoopPortal(loop.line.burnley, 25, "burnley-direct"))
    .station(richmond.point("burnley"))
    .curve(defaultRadius, -45)
    .straight(burnleyStraight)
    //.stations([EAST_RICHMOND])
    .station(burnleyInterchange.point("burnley"))
    .split({
      split: new Path()
        .curve(defaultRadius, 45)
        .straight(glenIrisStraight)
        .curve(defaultRadius, -45)
        .straight(glenWaverleyStraight),
      //.stations([HEYINGTON, KOOYONG, TOORONGA, etc.])
      //.terminus(),
    })
    .curve(defaultRadius, -45)
    .straight(camberwellStraight)
    //.stations([HAWTHORN, GLENFERRIE, AUBURN])
    .station(camberwell.point("camberwell"))
    .split({
      split: new Path()
        .curve(defaultRadius, 45)
        .straight(riversdaleStraight)
        .curve(defaultRadius, 45)
        .straight(alameinStraight),
    })
    .straight(laburnumStraight)
    .curve(defaultRadius, 45)
    .straight(ringwoodStraight)
    .station(ringwood.point("ringwood"))
    .split({
      split: new Path().curve(defaultRadius, 45).straight(belgraveStraight),
    })
    .straight(lilydaleStraight),
});
