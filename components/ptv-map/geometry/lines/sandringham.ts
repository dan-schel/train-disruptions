import { Line } from "../../lib/geometry";
import { Path } from "../../lib/path";
import { flindersStreet, richmond } from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import * as loop from "../utils-city-loop";

/** The Sandringham line (colored pink on the map). */
export const sandringham: Line = {
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",

  path: new Path()
    .station(flindersStreet.point("sandringham"))
    .add(flindersStreetToRichmond(loop.line.sandringham))
    .station(richmond.point("sandringham")),
};
