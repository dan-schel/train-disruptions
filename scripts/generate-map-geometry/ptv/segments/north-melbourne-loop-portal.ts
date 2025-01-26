import { Path } from "../../lib/path/path";
import {
  measure45CurveLockedRadius,
  measure45CurveLockedStraight,
} from "../utils";
import * as loop from "../utils-city-loop";
import * as direct from "./southern-cross-to-north-melbourne";

const directRadius = 20;

/**
 * The curve from Southern Cross to North Melbourne, and the split back to
 * Flagstaff.
 */
export function northMelbourneLoopPortal(branch: Path): Path {
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
  } = measure45CurveLockedStraight(portalLongLength, portalShortLength, 0);

  const {
    straightLength: southernCrossStraight,
    diagonalLength: directNorthMelbourneStraight,
  } = measure45CurveLockedRadius(directLongLength, directShortLength, 20);

  return new Path()
    .straight(southernCrossStraight)
    .curve(directRadius, -45)
    .straight(directNorthMelbourneStraight)
    .split({
      reverse: true,
      split: new Path()
        .straight(loopNorthMelbourneStraight)
        .curve(loopPortalRadius, -45)
        .add(branch),
    });
}
