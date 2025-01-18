import { Line } from "../../lib/geometry";
import { caulfieldLoop } from "../segments/caulfield-loop";

export const dandenong: Line = {
  x: 0,
  y: 15,
  angle: 180,
  color: "cyan",
  path: caulfieldLoop(),
};
