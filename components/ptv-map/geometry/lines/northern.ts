import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path/path";
import {
  flagstaff,
  flindersStreet,
  northMelbourne,
  parliament,
  southernCross,
} from "../interchanges";
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
    .station(northMelbourne.point("northern")),
};
