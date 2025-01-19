import { FlexiLength, InformalFlexiLength } from "../../lib/flexi-length";
import { curve, Path, split, straight } from "../../lib/geometry";
import { measure45CurveLockedDiagonal, reversePath } from "../utils";
import * as loop from "../utils-city-loop";
import * as direct from "./flinders-street-to-richmond";

/** The curve from Parliament to Richmond, and the split back to Flinders Street. */
export function richmondLoopPortal(
  lineNumber: loop.LineNumber,
  portalStraight: InformalFlexiLength,
): Path[] {
  const parliamentPos = loop.pos.parliament(lineNumber);
  const richmondPos = direct.richmondPos(lineNumber);

  // TODO: [DS] Radius cannot be flexi at the moment (I think enabling to be
  // would be fine), so always use the min. This will break if the city loop
  // ever uses flexi lengths!
  const longLength = parliamentPos.verticalDistanceTo(richmondPos).min;
  const shortLength = parliamentPos.horizontalDistanceTo(richmondPos).min;
  const diagonalLength = FlexiLength.formalize(portalStraight).min;

  const { straightLength, radius } = measure45CurveLockedDiagonal(
    longLength,
    shortLength,
    diagonalLength,
  );

  return [
    // Parliament
    straight(straightLength),
    curve({ radius: radius, angle: -45 }),
    straight(diagonalLength),
    split({
      reverse: true,
      split: [
        // Richmond
        ...reversePath(direct.flindersStreetToRichmond(lineNumber)),
        // Flinders Street
      ],
    }),
    // Richmond
  ];
}
