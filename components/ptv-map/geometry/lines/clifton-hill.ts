import { Line } from "../../lib/geometry";
import { cliftonHillLoop } from "../segments/clifton-hill-loop";
import { flindersStreetCoords } from "../utils-city-loop";

/**
 * The Hurstbridge and Mernda lines, a.k.a. the "Clifton Hill group" (colored
 * red on the map).
 */
export const cliftonHill: Line = {
  origin: flindersStreetCoords(1),
  angle: 180,
  color: "red",
  path: cliftonHillLoop(),
};
