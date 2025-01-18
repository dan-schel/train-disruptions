import { Line } from "../../lib/geometry";
import { crossCityWest } from "../segments/cross-city-west";
import { frankstonLine } from "../segments/frankston-line";

/**
 * The Frankston line, which makes up the eastern half of the "Cross City" group
 * (colored green on the map).
 */
export const crossCityEastern: Line = {
  x: 0,
  y: 25,
  angle: 0,
  color: "green",
  path: frankstonLine(),
};

/**
 * The Werribee and Williamstown lines, which make up the western half of the
 * "Cross City" group (colored green on the map).
 */
export const crossCityWestern: Line = {
  x: 0,
  y: 25,
  angle: 180,
  color: "green",
  path: crossCityWest(),
};
