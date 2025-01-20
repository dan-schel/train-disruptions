import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  caulfield,
  flindersStreet,
  footscray,
  northMelbourne,
  richmond,
  southernCross,
  southYarra,
} from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { northMelbourneToFootscray } from "../segments/north-melbourne-to-footscray";
import { southernCrossToNorthMelbourne } from "../segments/southern-cross-to-north-melbourne";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";

/**
 * The Frankston line, which makes up the eastern half of the "Cross City" group
 * (colored green on the map).
 */
export const crossCityEastern = new Line({
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 0,
  color: "green",

  path: new Path()
    .station(flindersStreet.point("cross-city-east"))
    .add(flindersStreetToRichmond(loop.line.crossCity))
    .station(richmond.point("frankston"))
    .straight(15)
    .station(southYarra.point("frankston"))
    .straight(30)
    .station(caulfield.point("frankston"))
    .curve(defaultRadius, 45)
    .straight(50)
    .curve(defaultRadius, -45)
    .straight(10)
    .curve(defaultRadius, -45)
    .straight(20),
});

// TODO: [DS] The Stony Point line!

/**
 * The Werribee and Williamstown lines, which make up the western half of the
 * "Cross City" group (colored green on the map).
 */
export const crossCityWestern = new Line({
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 180,
  color: "green",

  path: new Path()
    .station(flindersStreet.point("cross-city-west"))
    .add(flindersStreetToSouthernCross(5, false))
    .station(southernCross.point("cross-city"))
    .add(southernCrossToNorthMelbourne(5))
    .station(northMelbourne.point("cross-city"))
    .add(northMelbourneToFootscray("cross-city"))
    .station(footscray.point("cross-city")),
});
