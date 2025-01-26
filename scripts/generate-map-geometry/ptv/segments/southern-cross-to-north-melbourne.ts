import { flexi } from "../../lib/dimensions/flexi-length";
import { FlexiPoint } from "../../lib/dimensions/flexi-point";
import { Path } from "../../lib/path/path";
import { diagonal, lineGap, long45, short45 } from "../utils";
import * as loop from "../utils-city-loop";

const innerRadius = flexi(15);
const southernCrossStraight = flexi(30);
const northMelbourneStraight = flexi(10);

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
  const curveRadius = lineGap.divide(short45);
  const curveHeight = curveRadius.times(long45);

  const straightLength = southernCrossStraight.minus(curveHeight);

  const branchSouthernCrossStraight = flexi(10).times(diagonal);
  const branchNorthMelbourneStraight = flexi(5);

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

export function northMelbournePos(
  track: "cross-city" | "regional-rrl" | "regional-seymour" | "northern",
): FlexiPoint {
  const southernCrossLineNumber = {
    "cross-city": loop.line.crossCity,
    "regional-rrl": loop.line.regional,
    "regional-seymour": loop.line.dandenong,
    northern: loop.line.burnley,
  }[track];

  return loop.pos
    .southernCross(southernCrossLineNumber)
    .minus({ y: southernCrossStraight })
    .minus({
      x: radius(southernCrossLineNumber).times(short45),
      y: radius(southernCrossLineNumber).times(long45),
    })
    .minus({
      x: northMelbourneStraight.times(diagonal),
      y: northMelbourneStraight.times(diagonal),
    });
}

function radius(lineNumber: loop.LineNumber) {
  return innerRadius.plus(lineGap.times(5 - lineNumber));
}
