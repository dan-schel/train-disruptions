import { Line } from "../../lib/geometry";
import { crossCityWest } from "../segments/cross-city-west";
import { frankstonLine } from "../segments/frankston-line";

export const crossCityEastern: Line = {
  x: 0,
  y: 25,
  angle: 0,
  color: "green",
  path: frankstonLine(),
};

export const crossCityWestern: Line = {
  x: 0,
  y: 25,
  angle: 180,
  color: "green",
  path: crossCityWest(),
};
