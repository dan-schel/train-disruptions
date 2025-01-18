import { Line } from "../../lib/geometry";
import { sandringhamLine } from "../segments/sandringham";
import * as loop from "../utils-city-loop";

/** The Sandringham line (colored pink on the map). */
export const sandringham: Line = {
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",
  path: sandringhamLine(),
};
