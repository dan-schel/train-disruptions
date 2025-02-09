import { EAST_PAKENHAM } from "../../../../shared/station-ids";
import { flexi } from "../../lib/dimensions/flexi-length";
import { LineBlueprint } from "../../lib/blueprint/line-blueprint";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import {
  caulfield,
  clayton,
  dandenong,
  flindersStreet,
  pakenham,
  richmond,
  southernCross,
  southYarra,
} from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { flindersStreetToSouthernCross } from "../segments/flinders-street-to-southern-cross";
import { defaultRadius, standardDiagonal } from "../utils";
import * as loop from "../utils-city-loop";
import {
  caulfieldToClayton,
  claytonToDandenong,
  dandenongToHallamCurve,
  hallamCurveGippland,
  hallamToPakenham,
  pakenhamToEastPakenham,
  richmondToSouthYarra,
  southYarraToCaulfield,
} from "../utils-shared-corridors";

const eastPakenhamToCurve = flexi(10, 25);
const bairnsdaleStraight = flexi(60, 120);

/** The Gippsland line (colored purple on the map). */
export const gippsland = new LineBlueprint({
  origin: loop.pos.southernCross(loop.line.crossCity),
  angle: 45,
  color: "purple",

  path: new PathBlueprint()
    .station(southernCross.point("regional-east"))
    .add(flindersStreetToSouthernCross(loop.line.regional, true).reverse())
    .station(flindersStreet.point("regional"))
    .add(flindersStreetToRichmond(loop.line.regional))
    .station(richmond.point("gippsland"))
    .straight(richmondToSouthYarra)
    .station(southYarra.point("gippsland"))
    .straight(southYarraToCaulfield)
    .station(caulfield.point("gippsland"))
    .straight(caulfieldToClayton)
    .station(clayton.point("gippsland"))
    .straight(claytonToDandenong)
    .station(dandenong.point("gippsland"))
    .straight(dandenongToHallamCurve)
    .curve(hallamCurveGippland, -45)
    .straight(hallamToPakenham)
    .station(pakenham.point("gippsland"))
    .straight(pakenhamToEastPakenham)
    .station(EAST_PAKENHAM)
    .straight(eastPakenhamToCurve)
    .curve(defaultRadius, -45)
    .straight(standardDiagonal)
    .curve(defaultRadius, -45)
    .straight(bairnsdaleStraight)
    .terminus(),
});
