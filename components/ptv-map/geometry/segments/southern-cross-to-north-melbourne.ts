import { FlexiLength } from "../../lib/flexi-length";
import { FlexiPoint } from "../../lib/flexi-point";
import { Path } from "../../lib/path";
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
): Path {
  return new Path()
    .straight(southernCrossStraight)
    .curve(radius(southernCrossLineNumber), -45)
    .straight(northMelbourneStraight);
}

/**
 * The direct path from Southern Cross to North Melbourne that the regional
 * lines use, including the split just before North Melbourne.
 */
export function southernCrossToNorthMelbourneRegional(branch: Path): Path {
  const curveRadius = lineGap / short45;
  const curveHeight = curveRadius * long45;

  const straightLength = FlexiLength.formalize(southernCrossStraight).minus(
    curveHeight,
  );

  const branchSouthernCrossStraight = 10 * diagonal;
  const branchNorthMelbourneStraight = 5;

  return new Path()
    .curve(curveRadius, 45)
    .straight(straightLength)
    .split({
      split: new Path()
        .straight(branchSouthernCrossStraight)
        .curve(radius(loop.line.regional), -45)
        .straight(branchNorthMelbourneStraight)
        .add(branch),
    })
    .curve(radius(loop.line.regional), -45)
    .straight(northMelbourneStraight);
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
