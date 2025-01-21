import { JOLIMONT } from "../../../../server/data/station-ids";
import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  flagstaff,
  flindersStreet,
  parliament,
  southernCross,
  cliftonHill as cliftonHillInterchange,
} from "../interchanges";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { jolimontLoopPortal } from "../segments/jolimont-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";

const cliftonHillStraight = 120;
const heidelbergStraight = 170;
const hurstbridgeStraight = 255;
const prestonStraight = 115;
const keonParkStraight = 60;
const merndaStraight = 195;

/**
 * The Hurstbridge and Mernda lines, a.k.a. the "Clifton Hill group" (colored
 * red on the map).
 */
export const cliftonHill = new Line({
  origin: loop.pos.flindersStreet(loop.line.cliftonHill),
  angle: 180,
  color: "red",

  path: new Path()
    .station(flindersStreet.point("clifton-hill-loop"))
    .add(flindersStreetToSouthernCross(1, false))
    .station(southernCross.point("clifton-hill"))
    .add(southernCrossToFlagstaff(1))
    .station(flagstaff.point("clifton-hill"))
    .add(flagstaffToParliament(1, "clifton-hill"))
    .station(parliament.point("clifton-hill"))
    .add(jolimontLoopPortal())
    .station(JOLIMONT)
    .straight(cliftonHillStraight)
    .station(cliftonHillInterchange.point("clifton-hill"))
    .split({
      split: new Path()
        .straight(heidelbergStraight)
        .curve(defaultRadius, 45)
        .straight(hurstbridgeStraight),
    })
    .curve(defaultRadius, -45)
    .straight(prestonStraight)
    .curve(defaultRadius, 45)
    .straight(keonParkStraight)
    .curve(defaultRadius, 45)
    .straight(merndaStraight),
});
