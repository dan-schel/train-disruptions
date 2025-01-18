import { FLAGSTAFF, PARLIAMENT } from "../../../../server/data/station-ids";
import { interchangeMarker, Line } from "../../lib/geometry";
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
  path: [
    // Flinders Street
    ...flindersStreetToSouthernCross(3),
    // Southern Cross
    ...southernCrossToFlagstaff(3),
    interchangeMarker({ id: FLAGSTAFF }),
    ...flagstaffToParliament(3),
    interchangeMarker({ id: PARLIAMENT }),
    ...richmondLoopPortal(loop.line.dandenong, 20),
    // Richmond,
  ],
};
