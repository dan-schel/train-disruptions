import { Line } from "../../lib/geometry";
import { gippslandLine } from "../segments/gippsland-line";
import { regionalSxsToNme } from "../segments/regional-sxs-to-nme";

export const regionalEastern: Line = {
  x: -80,
  y: -22,
  angle: 0,
  color: "purple",
  path: gippslandLine(),
};

export const regionalWestern: Line = {
  x: -70,
  y: -28,
  angle: 180,
  color: "purple",
  path: regionalSxsToNme(),
};
