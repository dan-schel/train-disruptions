import { Line } from "../../lib/geometry";
import { northernLoop } from "../segments/northern-loop";
import { fssCoords } from "../utils";

/**
 * The Craigieburn, Sunbury, and Upfield lines, a.k.a. the "Northern group"
 * (colored yellow on the map).
 */
export const northern: Line = {
  origin: fssCoords(0),
  angle: 180,
  color: "yellow",
  path: northernLoop(),
};
