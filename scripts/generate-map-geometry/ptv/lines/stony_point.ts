import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { STONY_POINT as node } from "@/shared/map-node-ids";
import { frankstonStationPos } from "@/scripts/generate-map-geometry/ptv/lines/frankston";

const stonyPointStraight = flexi(50, 100);

/** The Stony Point line (colored green on the map). */
export const stonyPoint = new LineBlueprint({
  origin: frankstonStationPos("stony-point"),
  angle: 0,
  color: "green",

  path: new PathBlueprint()
    .node(node.FRANKSTON)
    .straight(stonyPointStraight)
    .node(node.STONY_POINT)
    .terminus(),
});
