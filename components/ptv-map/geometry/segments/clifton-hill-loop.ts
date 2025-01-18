import { straight, curve, Path, split } from "../../lib/geometry";
import { flagstaffToParliament } from "./flagstaff-to-parliament";
import { flindersStreetToSouthernCross } from "./flinders-street-to-southern-cross";

export function cliftonHillLoop(): Path[] {
  return [
    // FLINDERS_STREET
    ...flindersStreetToSouthernCross(1),
    // SOUTHERN_CROSS
    straight({ min: 20, max: 20 }),
    curve({ radius: 20, angle: 90 }),
    // FLAGSTAFF
    ...flagstaffToParliament(1),
    // PARLIAMENT
    straight({ min: 30, max: 30 }),
    curve({ radius: 20, angle: -90 }),
    split({
      reverse: true,
      split: [
        straight({ min: 60, max: 60 }),
        // FLINDERS_STREET
      ],
    }),
    curve({ radius: 20, angle: -45 }),
    straight({ min: 20, max: 20 }),
  ];
}
