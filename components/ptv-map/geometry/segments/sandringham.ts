import { FLINDERS_STREET, RICHMOND } from "../../../../server/data/station-ids";
import { curve, interchangeMarker, Path, straight } from "../../lib/geometry";

export function sandringhamLine(): Path[] {
  return [
    interchangeMarker({ id: FLINDERS_STREET }),
    straight({ min: 40, max: 40 }),
    curve({ radius: 15, angle: 45 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: RICHMOND }),
  ];
}
