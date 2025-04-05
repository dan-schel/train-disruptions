import { FlexiLength } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { measure45CurveLockedDiagonal } from "@/scripts/generate-map-geometry/ptv/utils";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";
import * as direct from "@/scripts/generate-map-geometry/ptv/segments/flinders-street-to-richmond";
import { SegmentBuilderFunction } from "@/scripts/generate-map-geometry/lib/line-builder";

/** The curve from Parliament to Richmond. */
export function parliamentToRichmond(
  lineNumber: loop.LineNumber,
  portalStraight: FlexiLength,
): SegmentBuilderFunction {
  const parliamentPos = loop.pos.parliament(lineNumber);
  const richmondPos = direct.richmondPos(lineNumber);
  const longLength = parliamentPos.verticalDistanceTo(richmondPos);
  const shortLength = parliamentPos.horizontalDistanceTo(richmondPos);
  const { straightLength, radius } = measure45CurveLockedDiagonal(
    longLength,
    shortLength,
    portalStraight,
  );

  return (builder) =>
    builder.straight(straightLength).curve(radius, 90).straight(portalStraight);

  // return new PathBlueprint()
  //   .straight(straightLength)
  //   .curve(radius, -45)
  //   .straight(portalStraight)
  //   .node(richmondNodeId)
  //   .split({
  //     reverse: true,
  //     split: direct
  //       .flindersStreetToRichmond(lineNumber)
  //       .reverse()
  //       .node(flindersStreetNodeId),
  //   });
}
