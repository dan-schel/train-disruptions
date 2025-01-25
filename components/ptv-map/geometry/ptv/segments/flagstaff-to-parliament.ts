import { Path } from "../../lib/path/path";
import { melbourneCentral } from "../interchanges";
import * as loop from "../utils-city-loop";

/** Underground city loop section from Flagstaff to Parliament. */
export function flagstaffToParliament(
  lineNumber: loop.LineNumber,
  melbourneCentralPoint: (typeof melbourneCentral.points)[number],
): Path {
  const flagstaffPos = loop.pos.flagstaff(lineNumber);
  const melbourneCentralPos = loop.pos.melbourneCentral(lineNumber);
  const parliamentPos = loop.pos.parliament(lineNumber);

  const radius = loop.radius(lineNumber);

  return new Path()
    .straight(flagstaffPos.horizontalDistanceTo(melbourneCentralPos))
    .station(melbourneCentral.point(melbourneCentralPoint))
    .straight(
      melbourneCentralPos.horizontalDistanceTo(parliamentPos).minus(radius),
    )
    .curve(radius, 90)
    .straight(
      parliamentPos.verticalDistanceTo(melbourneCentralPos).minus(radius),
    );
}
