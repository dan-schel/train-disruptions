import { Line } from "../../lib/geometry";
import { caulfieldLoop } from "../segments/caulfield-loop";
import { flindersStreetCoords } from "../utils-city-loop";

/**
 * The Cranbourne and Pakenham lines, a.k.a. the "Dandenong group" (colored
 * light blue/cyan on the map).
 */
export const dandenong: Line = {
  origin: flindersStreetCoords(3),
  angle: 180,
  color: "cyan",
  path: caulfieldLoop(),
};
