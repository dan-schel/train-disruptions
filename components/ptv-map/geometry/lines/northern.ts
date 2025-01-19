import {
  FLINDERS_STREET,
  SOUTHERN_CROSS,
  FLAGSTAFF,
  PARLIAMENT,
  NORTH_MELBOURNE,
} from "../../../../server/data/station-ids";
import { interchangeMarker, Line } from "../../lib/geometry";
import { flagstaffToParliament } from "../segments/flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { northMelbourneLoopPortal } from "../segments/north-melbourne-loop-portal";
import { parliamentToFlindersStreet } from "../segments/parliament-to-flinders-street";
import * as loop from "../utils-city-loop";

/**
 * The Craigieburn, Sunbury, and Upfield lines, a.k.a. the "Northern group"
 * (colored yellow on the map).
 */
export const northern: Line = {
  origin: loop.pos.flindersStreet(loop.line.northern),
  angle: 180,
  color: "yellow",
  path: [
    interchangeMarker({ id: FLINDERS_STREET }),
    ...flindersStreetToSouthernCross(0, false),
    interchangeMarker({ id: SOUTHERN_CROSS }),
    ...northMelbourneLoopPortal([
      interchangeMarker({ id: FLAGSTAFF }),
      ...flagstaffToParliament(0),
      interchangeMarker({ id: PARLIAMENT }),
      ...parliamentToFlindersStreet(0),
      // Flinders Street
    ]),
    interchangeMarker({ id: NORTH_MELBOURNE }),
  ],
};
