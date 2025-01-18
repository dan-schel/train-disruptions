import { Line } from "../../lib/geometry";
import { cliftonHillLoop } from "../segments/clifton-hill-loop";

export const cliftonHill: Line = {
  x: 0,
  y: 5,
  angle: 180,
  color: "red",
  path: cliftonHillLoop(),
};
