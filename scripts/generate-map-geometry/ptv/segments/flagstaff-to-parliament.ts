import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { melbourneCentral } from "@/scripts/generate-map-geometry/ptv/interchanges";
import * as loop from "@/scripts/generate-map-geometry/ptv/utils-city-loop";

/** Underground city loop section from Flagstaff to Parliament. */
export function flagstaffToParliament(
  lineNumber: loop.LineNumber,
  melbourneCentralPoint: (typeof melbourneCentral.points)[number],
): PathBlueprint {
  const flagstaffPos = loop.pos.flagstaff(lineNumber);
  const melbourneCentralPos = loop.pos.melbourneCentral(lineNumber);
  const parliamentPos = loop.pos.parliament(lineNumber);

  const radius = loop.radius(lineNumber);

  return new PathBlueprint()
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
