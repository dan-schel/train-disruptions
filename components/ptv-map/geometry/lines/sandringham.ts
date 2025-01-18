import { Line } from "../../lib/geometry";
import { sandringhamLine } from "../segments/sandringham";

/** The Sandringham line (colored pink on the map). */
export const sandringham: Line = {
  x: 0,
  y: 30,
  angle: 0,
  color: "pink",
  path: sandringhamLine(),
};
