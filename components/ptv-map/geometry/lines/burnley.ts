import { Line } from "../../lib/geometry";
import { burnleyLoop } from "../segments/burnley-loop";
import { fssCoords } from "../utils";

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley: Line = {
  origin: fssCoords(2),
  angle: 180,
  color: "blue",
  path: burnleyLoop(),
};
