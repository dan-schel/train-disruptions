import { straight, curve, split } from "../../lib/geometry";
import { Path } from "../../lib/path";
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
export function northMelbourneLoopPortal(branch: Path): Path[] {
  const southernCrossPos = loop.pos.southernCross(loop.line.northern);
  const flagstaffPos = loop.pos.flagstaff(loop.line.northern);

  // If the Burnley line (dark blue) continued around to North Melbourne
  // (following the curve of the Werribee/Williamstown line), it would be drawn
  // where we want to draw the Northern loop portal.
  const northMelbournePos = direct.northMelbournePos(loop.line.burnley);

  // TODO: [DS] Radius cannot be flexi at the moment (I think enabling to be
  // would be fine), so always use the min. This will break if the city loop
  // ever uses flexi lengths!
  const portalLongLength =
    northMelbournePos.horizontalDistanceTo(flagstaffPos).min;
  const portalShortLength =
    northMelbournePos.verticalDistanceTo(flagstaffPos).min;
  const directLongLength =
    northMelbournePos.verticalDistanceTo(southernCrossPos).min;
  const directShortLength =
    northMelbournePos.horizontalDistanceTo(southernCrossPos).min;

  const {
    diagonalLength: loopNorthMelbourneStraight,
    radius: loopPortalRadius,
  } = measure45CurveLockedStraight(portalLongLength, portalShortLength, 0);

  const {
    straightLength: southernCrossStraight,
    diagonalLength: directNorthMelbourneStraight,
  } = measure45CurveLockedRadius(directLongLength, directShortLength, 20);

  return [
    // Southern Cross
    straight(southernCrossStraight),
    curve({
      radius: directRadius,
      angle: -45,
    }),
    straight(directNorthMelbourneStraight),
    split({
      reverse: true,
      split: [
        // North Melbourne
        straight(loopNorthMelbourneStraight),
        curve({
          radius: loopPortalRadius,
          angle: -45,
        }),
        // Flagstaff
        ...branch,
      ],
    }),
    // North Melbourne
  ];
}
