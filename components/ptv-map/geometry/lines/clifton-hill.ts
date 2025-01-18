import { Line } from "../../lib/geometry";
import { cliftonHillLoop } from "../segments/clifton-hill-loop";
import { fssCoords } from "../utils";

/**
 * The Hurstbridge and Mernda lines, a.k.a. the "Clifton Hill group" (colored
 * red on the map).
 */
export const cliftonHill: Line = {
  origin: fssCoords(1),
  angle: 180,
  color: "red",
  path: cliftonHillLoop(),
};
