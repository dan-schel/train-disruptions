import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import {
  measure45CurveLockedRadius,
  measure45CurveLockedStraight,
} from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import * as direct from "@/scripts/generate-map-geometry/ptv/segments/southern-cross-to-north-melbourne";

const directRadius = flexi(20);

/**
 * The curve from Southern Cross to North Melbourne, and the split back to
 * Flagstaff.
 */
export function northMelbourneLoopPortal(branch: PathBlueprint): PathBlueprint {
  const southernCrossPos = loop.pos.southernCross(loop.line.northern);
  const flagstaffPos = loop.pos.flagstaff(loop.line.northern);
  const northMelbournePos = direct.northMelbournePos("northern");

  const portalLongLength = northMelbournePos.horizontalDistanceTo(flagstaffPos);
  const portalShortLength = northMelbournePos.verticalDistanceTo(flagstaffPos);
  const directLongLength =
    northMelbournePos.verticalDistanceTo(southernCrossPos);
  const directShortLength =
    northMelbournePos.horizontalDistanceTo(southernCrossPos);

  const {
    diagonalLength: loopNorthMelbourneStraight,
    radius: loopPortalRadius,
  } = measure45CurveLockedStraight(
    portalLongLength,
    portalShortLength,
    flexi(0),
  );

  const {
    straightLength: southernCrossStraight,
    diagonalLength: directNorthMelbourneStraight,
  } = measure45CurveLockedRadius(
    directLongLength,
    directShortLength,
    directRadius,
  );

  return new PathBlueprint()
    .straight(southernCrossStraight)
    .curve(directRadius, -45)
    .straight(directNorthMelbourneStraight)
    .split({
      reverse: true,
      split: new PathBlueprint()
        .straight(loopNorthMelbourneStraight)
        .curve(loopPortalRadius, -45)
        .add(branch),
    });
}
