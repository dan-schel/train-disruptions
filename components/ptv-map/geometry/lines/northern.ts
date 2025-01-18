import { Line } from "../../lib/geometry";
import { northernLoop } from "../segments/northern-loop";
import { flindersStreetCoords } from "../utils-city-loop";

/**
 * The Craigieburn, Sunbury, and Upfield lines, a.k.a. the "Northern group"
 * (colored yellow on the map).
 */
export const northern: Line = {
  origin: flindersStreetCoords(0),
  angle: 180,
  color: "yellow",
  path: northernLoop(),
};
