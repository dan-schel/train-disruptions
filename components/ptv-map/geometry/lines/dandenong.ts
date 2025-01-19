import {
  FLAGSTAFF,
  FLINDERS_STREET,
  PARLIAMENT,
  RICHMOND,
  SOUTHERN_CROSS,
} from "../../../../server/data/station-ids";
import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
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
    .station(FLINDERS_STREET)
    .add(flindersStreetToSouthernCross(3, false))
    .station(SOUTHERN_CROSS)
    .add(southernCrossToFlagstaff(3))
    .interchange(FLAGSTAFF)
    .add(flagstaffToParliament(3))
    .interchange(PARLIAMENT)
    .add(richmondLoopPortal(loop.line.dandenong, 20))
    .station(RICHMOND),
};
