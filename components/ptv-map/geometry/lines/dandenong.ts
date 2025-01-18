import { Line } from "../../lib/geometry";
import { caulfieldLoop } from "../segments/caulfield-loop";

/**
 * The Cranbourne and Pakenham lines, a.k.a. the "Dandenong group" (colored
 * light blue/cyan on the map).
 */
export const dandenong: Line = {
  x: 0,
  y: 15,
  angle: 180,
  color: "cyan",
  path: caulfieldLoop(),
};
