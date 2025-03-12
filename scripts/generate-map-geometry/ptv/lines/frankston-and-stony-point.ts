import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import {
  caulfield,
  flindersStreet,
  frankston as frankstonInterchange,
  richmond,
  southYarra,
} from "@/scripts/generate-map-geometry/ptv/interchanges";
import {
  flindersStreetToRichmond,
  richmondPos,
} from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-richmond";
import {
  defaultRadius,
  diagonal,
  lineGap,
  long45,
  short45,
  standardDiagonal,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import {
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "@/scripts/generate-map-geometry/ptv/utils-shared-corridors";

const aspendaleStraight = flexi(60, 120);
const frankstonStraight = flexi(30, 60);
const stonyPointStraight = flexi(50, 100);

/** The Frankston line (colored green on the map). */
export const frankston = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.crossCity),
  angle: 0,
  color: "green",

  path: new PathBlueprint()
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
    .straight(standardDiagonal)
    .curve(defaultRadius, -45)
    .straight(frankstonStraight)
    .station(frankstonInterchange.point("frankston")),
});

/** The Stony Point line (colored green on the map). */
export const stonyPoint = new LineBlueprint({
  origin: frankstonStationPos("stony-point"),
  angle: 0,
  color: "green",

  path: new PathBlueprint()
    .station(frankstonInterchange.point("stony-point"))
    .straight(stonyPointStraight)
    .terminus(),
});

function frankstonStationPos(line: "frankston" | "stony-point") {
  // TODO: We could avoid all this maths if there was a method on the
  // PathBlueprint to retrieve the FlexiPoint (so far), given an origin point.

  const offset = {
    frankston: 0,
    "stony-point": 1,
  }[line];

  const richmondToCaufield = richmondToSouthYarra.plus(southYarraToCaulfield);

  return (
    richmondPos(loop.line.crossCity)
      // TODO: Also there's a few cases like this where .move() would be better
      .plus({
        x: richmondToCaufield.times(diagonal),
        y: richmondToCaufield.times(diagonal),
      })
      .plus({ x: defaultRadius.times(short45), y: defaultRadius.times(long45) })
      .plus({ y: aspendaleStraight })
      .plus({ x: defaultRadius.times(short45), y: defaultRadius.times(long45) })
      .plus({
        x: standardDiagonal.times(diagonal),
        y: standardDiagonal.times(diagonal),
      })
      .plus({ x: defaultRadius.times(long45), y: defaultRadius.times(short45) })
      .plus({ x: frankstonStraight })
      .plus({ y: lineGap.times(offset) })
  );
}
