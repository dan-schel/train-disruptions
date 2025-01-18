import {
  FLINDERS_STREET,
  SOUTHERN_CROSS,
  FLAGSTAFF,
  MELBOURNE_CENTRAL,
  PARLIAMENT,
  NORTH_MELBOURNE,
} from "../../../../server/data/station-ids";
import {
  interchangeMarker,
  straight,
  curve,
  Path,
  split,
} from "../../lib/geometry";
import { diagonal, long45, short45 } from "../utils";
import { flagstaffToParliament } from "./flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "./flinders-street-to-southern-cross";

const x = 25 + 15 * short45 - 5 * diagonal;
const y = 15 * long45 + 25 * diagonal;
const w = 15 + x;
const h = 35 + y;
const r = (w - y) / (long45 - short45);
const d = (w - r * long45) / diagonal;
const r2 = 20;
const l1 = (x - short45 * r2) / diagonal;
const l2 = h - l1 * diagonal - long45 * r2;

export function northernLoop(): Path[] {
  return [
    interchangeMarker({ id: FLINDERS_STREET }),
    ...flindersStreetToSouthernCross(0),
    interchangeMarker({ id: SOUTHERN_CROSS }),
    straight({ min: l2, max: l2 }),
    curve({
      radius: r2,
      angle: -45,
    }),
    straight({ min: l1, max: l1 }),
    split({
      reverse: true,
      split: [
        straight({ min: d, max: d }),
        curve({
          radius: (w - y) / (long45 - short45),
          angle: -45,
        }),
        interchangeMarker({ id: FLAGSTAFF }),
        ...flagstaffToParliament(0),
        interchangeMarker({ id: PARLIAMENT }),
        straight({ min: 30, max: 30 }),
        curve({ radius: 15, angle: 90 }),
        straight({ min: 20, max: 20 }),
        // FLINDERS_STREET
      ],
    }),
    interchangeMarker({ id: NORTH_MELBOURNE }),
  ];
}
