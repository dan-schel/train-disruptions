import { Line } from "../../lib/geometry";
import { burnleyLoop } from "../segments/burnley-loop";

/**
 * The Alamein, Belgrave, Glen Waverley and Lilydale lines, a.k.a. the "Burnley
 * group" (colored dark blue on the map).
 */
export const burnley: Line = {
  x: 0,
  y: 10,
  angle: 180,
  color: "blue",
  path: burnleyLoop(),
};
