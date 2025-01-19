import {
  FLINDERS_STREET,
  SOUTHERN_CROSS,
  FLAGSTAFF,
  PARLIAMENT,
  NORTH_MELBOURNE,
} from "../../../../server/data/station-ids";
import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
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

  path: new Path()
    .interchange(FLINDERS_STREET)
    .add(flindersStreetToSouthernCross(0, false))
    .interchange(SOUTHERN_CROSS)
    .add(
      northMelbourneLoopPortal(
        new Path()
          .interchange(FLAGSTAFF)
          .add(flagstaffToParliament(0))
          .interchange(PARLIAMENT)
          .add(parliamentToFlindersStreet(0))
          .station(FLINDERS_STREET),
      ),
    )
    .interchange(NORTH_MELBOURNE),
};
