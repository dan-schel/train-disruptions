import { Line } from "../../lib/geometry";
import { sandringhamLine } from "../segments/sandringham";
import { fssCoords } from "../utils-city-loop";

/** The Sandringham line (colored pink on the map). */
export const sandringham: Line = {
  origin: fssCoords(6),
  angle: 0,
  color: "pink",
  path: sandringhamLine(),
};
