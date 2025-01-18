import { Line } from "../../lib/geometry";
import { crossCityWest } from "../segments/cross-city-west";
import { frankstonLine } from "../segments/frankston-line";
import { fssCoords } from "../utils";

/**
 * The Frankston line, which makes up the eastern half of the "Cross City" group
 * (colored green on the map).
 */
export const crossCityEastern: Line = {
  origin: fssCoords(5),
  angle: 0,
  color: "green",
  path: frankstonLine(),
};

/**
 * The Werribee and Williamstown lines, which make up the western half of the
 * "Cross City" group (colored green on the map).
 */
export const crossCityWestern: Line = {
  origin: fssCoords(5),
  angle: 180,
  color: "green",
  path: crossCityWest(),
};
