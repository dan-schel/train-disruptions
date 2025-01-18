import { bake } from "../lib/bake";
import { Geometry, Line } from "../lib/geometry";
import { burnleyLoop } from "./segments/burnley-loop";
import { caulfieldLoop } from "./segments/caulfield-loop";
import { cliftonHillLoop } from "./segments/clifton-hill-loop";
import { crossCityWest } from "./segments/cross-city-west";
import { frankstonLine } from "./segments/frankston-line";
import { gippslandLine } from "./segments/gippsland-line";
import { northernLoop } from "./segments/northern-loop";
import { regionalSxsToNme } from "./segments/regional-sxs-to-nme";
import { sandringhamLine } from "./segments/sandringham";

const gippsland: Line = {
  x: -80,
  y: -22,
  angle: 0,
  color: "purple",
  path: gippslandLine(),
};

const otherRegionalLines: Line = {
  x: -70,
  y: -28,
  angle: 180,
  color: "purple",
  path: regionalSxsToNme(),
};

const northernGroup: Line = {
  x: 0,
  y: 0,
  angle: 180,
  color: "yellow",
  path: northernLoop(),
};

const cliftonHillGroup: Line = {
  x: 0,
  y: 5,
  angle: 180,
  color: "red",
  path: cliftonHillLoop(),
};

const burnleyGroup: Line = {
  x: 0,
  y: 10,
  angle: 180,
  color: "blue",
  path: burnleyLoop(),
};

const dandenongGroup: Line = {
  x: 0,
  y: 15,
  angle: 180,
  color: "cyan",
  path: caulfieldLoop(),
};

const werribeeWilliamstown: Line = {
  x: 0,
  y: 25,
  angle: 180,
  color: "green",
  path: crossCityWest(),
};

const frankston: Line = {
  x: 0,
  y: 25,
  angle: 0,
  color: "green",
  path: frankstonLine(),
};

const sandringham: Line = {
  x: 0,
  y: 30,
  angle: 0,
  color: "pink",
  path: sandringhamLine(),
};

const raw: Geometry = [
  gippsland,
  otherRegionalLines,

  cliftonHillGroup,
  dandenongGroup,
  burnleyGroup,
  northernGroup,
  werribeeWilliamstown,
  frankston,
  sandringham,
];

export const ptvGeometry = bake(raw);
