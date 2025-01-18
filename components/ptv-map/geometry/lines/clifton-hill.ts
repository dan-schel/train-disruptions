import { Line } from "../../lib/geometry";
import { cliftonHillLoop } from "../segments/clifton-hill-loop";

/**
 * The Hurstbridge and Mernda lines, a.k.a. the "Clifton Hill group" (colored
 * red on the map).
 */
export const cliftonHill: Line = {
  x: 0,
  y: 5,
  angle: 180,
  color: "red",
  path: cliftonHillLoop(),
};
