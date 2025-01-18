import { MELBOURNE_CENTRAL } from "../../../../server/data/station-ids";
import { curve, interchangeMarker, Path, straight } from "../../lib/geometry";
import * as loop from "../utils-city-loop";

export function flagstaffToParliament(lineNumber: number): Path[] {
  const flagstaffPos = loop.flagstaffCoords(lineNumber);
  const melbourneCentralPos = loop.melbourneCentralCoords(lineNumber);
  const parliamentPos = loop.parliamentCoords(lineNumber);

  const radius = loop.radius(lineNumber);

  const flagstaffToMelbourneCentral = {
    min: melbourneCentralPos.min.x - flagstaffPos.min.x,
    max: melbourneCentralPos.max.x - flagstaffPos.max.x,
  };

  const melbourneCentralToCorner = {
    min: parliamentPos.min.x - melbourneCentralPos.min.x - radius,
    max: parliamentPos.max.x - melbourneCentralPos.max.x - radius,
  };

  const cornerToParliament = {
    min: parliamentPos.min.y - melbourneCentralPos.min.y - radius,
    max: parliamentPos.max.y - melbourneCentralPos.max.y - radius,
  };

  const addInterchangeMarker = lineNumber === 0 || lineNumber === 3;

  return [
    straight(flagstaffToMelbourneCentral),
    ...(addInterchangeMarker
      ? [interchangeMarker({ id: MELBOURNE_CENTRAL })]
      : []),
    straight(melbourneCentralToCorner),
    curve({ radius: radius, angle: 90 }),
    straight(cornerToParliament),
  ];
}
