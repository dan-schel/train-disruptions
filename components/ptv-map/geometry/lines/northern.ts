import { Line } from "../../lib/geometry";
import { northernLoop } from "../segments/northern-loop";

export const northern: Line = {
  x: 0,
  y: 0,
  angle: 180,
  color: "yellow",
  path: northernLoop(),
};
