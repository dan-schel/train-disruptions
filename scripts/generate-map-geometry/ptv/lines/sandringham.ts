import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flindersStreetToRichmond } from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-richmond";
import { defaultRadius } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import { richmondToSouthYarra } from "@/scripts/generate-map-geometry/ptv/utils-shared-corridors";
import { SANDRINGHAM as node } from "@/shared/map-node-ids";

const divergeStraight = flexi(10);
const diagonalStraight = flexi(10, 20);
const sandringhamStraight = flexi(40, 80);

/** The Sandringham line (colored pink on the map). */
export const sandringham = new LineBlueprint({
  origin: loop.pos.flindersStreet(loop.line.sandringham),
  angle: 0,
  color: "pink",

  path: new PathBlueprint()
    .node(node.FLINDERS_STREET)
    .add(flindersStreetToRichmond(loop.line.sandringham))
    .node(node.RICHMOND)
    .straight(richmondToSouthYarra)
    .node(node.SOUTH_YARRA)
    .curve(defaultRadius, 45)
    .straight(divergeStraight)
    .curve(defaultRadius, 45)
    .straight(diagonalStraight)
    .curve(defaultRadius, -45)
    .straight(sandringhamStraight)
    .node(node.SANDRINGHAM)
    .terminus(),
});
