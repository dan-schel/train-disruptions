import { Line } from "../../lib/geometry";
import { crossCityWest } from "../segments/cross-city-west";
import { frankstonLine } from "../segments/frankston-line";
import * as loop from "../utils-city-loop";

/**
 * The Frankston line, which makes up the eastern half of the "Cross City" group
 * (colored green on the map).
 */
export const crossCityEastern: Line = {
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 0,
  color: "green",
  path: frankstonLine(),
};

/**
 * The Werribee and Williamstown lines, which make up the western half of the
 * "Cross City" group (colored green on the map).
 */
export const crossCityWestern: Line = {
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 180,
  color: "green",
  path: crossCityWest(),
};
