import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import { flindersStreet, richmond, southYarra } from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";

/** The Sandringham line (colored pink on the map). */
export const sandringham = new Line({
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",

  path: new Path()
    .station(flindersStreet.point("sandringham"))
    .add(flindersStreetToRichmond(loop.line.sandringham))
    .station(richmond.point("sandringham"))
    .straight(15)
    .station(southYarra.point("sandringham"))
    .curve(defaultRadius, 45)
    .straight(10)
    .curve(defaultRadius, 45)
    .straight(10)
    .curve(defaultRadius, -45)
    .straight(30),
});
