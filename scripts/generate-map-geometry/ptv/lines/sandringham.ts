import { flexi } from "../../lib/dimensions/flexi-length";
import { LineBlueprint } from "../../lib/blueprint/line-blueprint";
import { PathBlueprint } from "../../lib/blueprint/path-blueprint";
import { flindersStreet, richmond, southYarra } from "../interchanges";
import { flindersStreetToRichmond } from "../segments/flinders-street-to-richmond";
import { defaultRadius } from "../utils";
import * as loop from "../utils-city-loop";
import { richmondToSouthYarra } from "../utils-shared-corridors";

const divergeStraight = flexi(10);
const diagonalStraight = flexi(10, 20);
const sandringhamStraight = flexi(40, 80);

/** The Sandringham line (colored pink on the map). */
export const sandringham = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",

  path: new PathBlueprint()
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
    .straight(sandringhamStraight)
    .terminus(),
});
