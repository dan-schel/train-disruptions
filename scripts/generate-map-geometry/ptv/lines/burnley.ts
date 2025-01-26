import { FlexiLength } from "../../lib/dimensions/flexi-length";
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

const burnleyStraight = new FlexiLength(20, 40);
const glenIrisStraight = new FlexiLength(35, 70);
const glenWaverleyStraight = new FlexiLength(45, 90);
const camberwellStraight = new FlexiLength(25, 50);
const riversdaleStraight = new FlexiLength(15, 30);
const alameinStraight = new FlexiLength(25, 50);
const laburnumStraight = new FlexiLength(35, 70);
const ringwoodStraight = new FlexiLength(30, 60);
const belgraveStraight = new FlexiLength(40, 80);
const lilydaleStraight = new FlexiLength(40, 80);

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley = new Line({
  origin: loop.pos.flindersStreet(loop.line.burnley),
  angle: 180,
  color: "blue",

  // TODO: Need a way to specify the stations between defined points.
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
        .straight(glenWaverleyStraight)
        .terminus(),
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
        .straight(alameinStraight)
        .terminus(),
    })
    .straight(laburnumStraight)
    .curve(defaultRadius, 45)
    .straight(ringwoodStraight)
    .station(ringwood.point("ringwood"))
    .split({
      split: new Path()
        .curve(defaultRadius, 45)
        .straight(belgraveStraight)
        .terminus(),
    })
    .straight(lilydaleStraight)
    .terminus(),
});
