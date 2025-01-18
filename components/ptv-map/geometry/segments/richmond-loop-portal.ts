import { FlexiLength, InformalFlexiLength } from "../../lib/flexi";
import { curve, Path, split, straight } from "../../lib/geometry";
import { measure45Curve } from "../utils";
import * as loop from "../utils-city-loop";
import * as direct from "./flinders-street-to-richmond";

export function richmondLoopPortal(
  lineNumber: loop.LineNumber,
  portalStraight: InformalFlexiLength,
): Path[] {
  const parliamentPos = loop.pos.parliament(lineNumber);
  // const flindersStreetPos = loop.pos.flindersStreet(lineNumber);
  const richmondPos = direct.richmondPos(lineNumber);

  // TODO: [DS] Radius cannot be flexi at the moment (I think enabling to be
  // would be fine), so always use the min. This will break if the city loop
  // ever uses flexi lengths!
  const longLength = parliamentPos.verticalDistanceTo(richmondPos).min;
  const shortLength = parliamentPos.horizontalDistanceTo(richmondPos).min;
  const diagonalLength = FlexiLength.formalize(portalStraight).min;

  const { straightLength, radius } = measure45Curve(
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
        ...direct.reverse(lineNumber),
        // Flinders Street
      ],
    }),
    // Richmond
  ];
}
