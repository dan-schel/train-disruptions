import { Line } from "../../lib/geometry";
import { northernLoop } from "../segments/northern-loop";
import * as loop from "../utils-city-loop";

/**
 * The Craigieburn, Sunbury, and Upfield lines, a.k.a. the "Northern group"
 * (colored yellow on the map).
 */
export const northern: Line = {
  origin: loop.pos.flindersStreet(loop.line.northern),
  angle: 180,
  color: "yellow",
  path: northernLoop(),
};
