import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import { flindersStreet, richmond, southYarra } from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";
import { richmondToSouthYarra } from "../utils-shared-corridors";

const divergeStraight = 5;
const diagonalStraight = 15;
const sandringhamStraight = 145;

/** The Sandringham line (colored pink on the map). */
export const sandringham = new Line({
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",

  path: new Path()
    .station(flindersStreet.point("sandringham"))
    .add(flindersStreetToRichmond(loop.line.sandringham))
    .station(richmond.point("sandringham"))
    .straight(richmondToSouthYarra)
    .station(southYarra.point("sandringham"))
    .curve(defaultRadius, 45)
    .straight(divergeStraight)
    .curve(defaultRadius, 45)
    .straight(diagonalStraight)
    .curve(defaultRadius, -45)
    .straight(sandringhamStraight),
});
