import { FlexiLength, FlexiPoint } from "../../lib/flexi";
import { curve, Path, split, straight } from "../../lib/geometry";
import { diagonal, lineGap, long45, short45 } from "../utils";
import * as loop from "../utils-city-loop";

const innerRadius = 15;
const southernCrossStraight = 30;
const northMelbourneStraight = 10;

/**
 * The direct path from Southern Cross to North Melbourne. Does not include city
 * loop portal or regional line split.
 */
export function southernCrossToNorthMelbourne(
  southernCrossLineNumber: loop.LineNumber,
): Path[] {
  return [
    straight(southernCrossStraight),
    curve({ radius: radius(southernCrossLineNumber), angle: -45 }),
    straight(northMelbourneStraight),
  ];
}

/**
 * The direct path from Southern Cross to North Melbourne that the regional
 * lines use, including the split just before North Melbourne.
 */
export function southernCrossToNorthMelbourneRegional(branch: Path[]): Path[] {
  const curveRadius = lineGap / short45;
  const curveHeight = curveRadius * long45;

  const straightLength = FlexiLength.formalize(southernCrossStraight).minus(
    curveHeight,
  );

  const branchSouthernCrossStraight = 10 * diagonal;
  const branchNorthMelbourneStraight = 5;

  return [
    // Southern Cross
    curve({ radius: curveRadius, angle: 45 }),
    straight(straightLength),
    split({
      reverse: false,
      split: [
        straight(branchSouthernCrossStraight),
        curve({ radius: radius(loop.line.regional), angle: -45 }),
        straight(branchNorthMelbourneStraight),
        // North Melbourne (Seymour line branch)
        ...branch,
      ],
    }),
    curve({ radius: radius(loop.line.regional), angle: -45 }),
    straight(northMelbourneStraight),
    // North Melbourne (RRL branch)
  ];
}

export function northMelbournePos(lineNumber: loop.LineNumber): FlexiPoint {
  return loop.pos
    .southernCross(lineNumber)
    .minus({ y: southernCrossStraight })
    .minus({ x: radius(lineNumber) * short45, y: radius(lineNumber) * long45 })
    .minus({
      x: northMelbourneStraight * diagonal,
      y: northMelbourneStraight * diagonal,
    });
}

function radius(lineNumber: loop.LineNumber): number {
  return innerRadius + (5 - lineNumber) * lineGap;
}
