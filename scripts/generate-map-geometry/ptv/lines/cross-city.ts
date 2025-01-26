import { Line } from "../../lib/line";
import { Path } from "../../lib/path/path";
import {
  caulfield,
  flindersStreet,
  footscray,
  frankston,
  laverton,
  newport,
  northMelbourne,
  richmond,
  southernCross,
  southYarra,
} from "../interchanges";
import {
  flindersStreetToRichmond,
  richmondPos,
} from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { northMelbourneToFootscray } from "../segments/north-melbourne-to-footscray";
import { southernCrossToNorthMelbourne } from "../segments/southern-cross-to-north-melbourne";
import {
  defaultRadius,
  diagonal,
  lineGap,
  long45,
  short45,
  standardDiagonal,
} from "../utils";
import * as loop from "../utils-city-loop";
import {
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "../utils-shared-corridors";

const aspendaleStraight = 120;
const bonbeachStraight = standardDiagonal;
const frankstonStraight = 60;
const stonyPointStraight = 100;

const newportStraight = 80;
const williamstownStraight = 40;
const westonaStraight = 30;
const altonaLoopDiagonals = 30;
const lavertonExpressStraight =
  westonaStraight + altonaLoopDiagonals * diagonal * 2;
const werribeeStraight = 50;

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
    .straight(richmondToSouthYarra)
    .station(southYarra.point("frankston"))
    .straight(southYarraToCaulfield)
    .station(caulfield.point("frankston"))
    .curve(defaultRadius, 45)
    .straight(aspendaleStraight)
    .curve(defaultRadius, -45)
    .straight(bonbeachStraight)
    .curve(defaultRadius, -45)
    .straight(frankstonStraight)
    .station(frankston.point("frankston")),
});

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
    .station(footscray.point("cross-city"))
    .curve(defaultRadius, -45)
    .straight(newportStraight)
    .station(newport.point("cross-city"))
    .split({
      split: new Path()
        .curve(defaultRadius, -45)
        .straight(williamstownStraight)
        .terminus(),
    })
    .split({
      split: new Path()
        .curve(defaultRadius, 45)
        .straight(lavertonExpressStraight)
        .curve(defaultRadius, 45),
    })
    .straight(altonaLoopDiagonals)
    .curve(defaultRadius, 45)
    .straight(westonaStraight)
    .curve(defaultRadius, 45)
    .straight(altonaLoopDiagonals)
    .station(laverton.point("werribee"))
    .straight(werribeeStraight)
    .terminus(),
});

/** The Stony Point line (colored green on the map). */
export const stonyPoint = new Line({
  origin: frankstonStationPos("stony-point"),
  angle: 0,
  color: "green",

  path: new Path()
    .station(frankston.point("stony-point"))
    .straight(stonyPointStraight)
    .terminus(),
});

function frankstonStationPos(line: "frankston" | "stony-point") {
  const offset = {
    frankston: 0,
    "stony-point": 1,
  }[line];

  const richmondToCaufield = richmondToSouthYarra + southYarraToCaulfield;

  return richmondPos(loop.line.crossCity)
    .plus({
      x: richmondToCaufield * diagonal,
      y: richmondToCaufield * diagonal,
    })
    .plus({ x: defaultRadius * short45, y: defaultRadius * long45 })
    .plus({ y: aspendaleStraight })
    .plus({ x: defaultRadius * short45, y: defaultRadius * long45 })
    .plus({ x: bonbeachStraight * diagonal, y: bonbeachStraight * diagonal })
    .plus({ x: defaultRadius * long45, y: defaultRadius * short45 })
    .plus({ x: frankstonStraight })
    .plus({ y: offset * lineGap });
}
