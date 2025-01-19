import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
import {
  flagstaff,
  flindersStreet,
  parliament,
  richmond,
  southernCross,
} from "../interchanges";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { richmondLoopPortal } from "../segments/richmond-loop-portal";
import { southernCrossToFlagstaff } from "../segments/southern-cross-to-flagstaff";
import * as loop from "../utils-city-loop";

/**
 * The Cranbourne and Pakenham lines, a.k.a. the "Dandenong group" (colored
 * light blue/cyan on the map).
 */
export const dandenong: Line = {
  origin: loop.pos.flindersStreet(loop.line.dandenong),
  angle: 180,
  color: "cyan",

  path: new Path()
    .station(flindersStreet.point("dandenong-loop"))
    .add(flindersStreetToSouthernCross(3, false))
    .station(southernCross.point("dandenong"))
    .add(southernCrossToFlagstaff(3))
    .station(flagstaff.point("dandenong"))
    .add(flagstaffToParliament(3, "dandenong"))
    .station(parliament.point("dandenong"))
    .add(richmondLoopPortal(loop.line.dandenong, 20, "dandenong-direct"))
    .station(richmond.point("dandenong")),
};
