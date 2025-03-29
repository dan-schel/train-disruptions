import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { measure45CurveLockedDiagonal } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import * as direct from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-richmond";

/** The curve from Parliament to Richmond, and the split back to Flinders Street. */
export function richmondLoopPortal(
  lineNumber: loop.LineNumber,
  portalStraight: FlexiLength,
  richmondNodeId: number,
  flindersStreetNodeId: number,
): PathBlueprint {
  const parliamentPos = loop.pos.parliament(lineNumber);
  const richmondPos = direct.richmondPos(lineNumber);

  const longLength = parliamentPos.verticalDistanceTo(richmondPos);
  const shortLength = parliamentPos.horizontalDistanceTo(richmondPos);

  const { straightLength, radius } = measure45CurveLockedDiagonal(
    longLength,
    shortLength,
    portalStraight,
  );

  return new PathBlueprint()
    .straight(straightLength)
    .curve(radius, -45)
    .straight(portalStraight)
    .nodes([richmondNodeId])
    .split({
      reverse: true,
      split: direct
        .flindersStreetToRichmond(lineNumber)
        .reverse()
        .nodes([flindersStreetNodeId]),
    });
}
