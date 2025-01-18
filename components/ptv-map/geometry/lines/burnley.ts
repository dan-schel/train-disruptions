import { Line } from "../../lib/geometry";
import { burnleyLoop } from "../segments/burnley-loop";

export const burnley: Line = {
  x: 0,
  y: 10,
  angle: 180,
  color: "blue",
  path: burnleyLoop(),
};
