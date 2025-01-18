import { Line } from "../../lib/geometry";
import { burnleyLoop } from "../segments/burnley-loop";
import { flindersStreetCoords } from "../utils-city-loop";

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley: Line = {
  origin: flindersStreetCoords(2),
  angle: 180,
  color: "blue",
  path: burnleyLoop(),
};
