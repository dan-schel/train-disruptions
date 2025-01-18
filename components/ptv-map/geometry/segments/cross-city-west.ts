import {
  SOUTHERN_CROSS,
  NORTH_MELBOURNE,
} from "../../../../server/data/station-ids";
import { curve, interchangeMarker, Path, straight } from "../../lib/geometry";

export function crossCityWest(): Path[] {
  return [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 40, angle: 90 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: SOUTHERN_CROSS }),
    straight({ min: 35, max: 35 }),
    curve({ radius: 15, angle: -45 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: NORTH_MELBOURNE }),
  ];
}
