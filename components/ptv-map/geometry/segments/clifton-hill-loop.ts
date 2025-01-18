import { straight, curve, Path, split } from "../../lib/geometry";

export function cliftonHillLoop(): Path[] {
  return [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 20, angle: 90 }),
    straight({ min: 10, max: 10 }),
    // SOUTHERN_CROSS
    straight({ min: 20, max: 20 }),
    curve({ radius: 20, angle: 90 }),
    // FLAGSTAFF
    straight({ min: 40, max: 40 }),
    // MELBOURNE_CENTRAL
    straight({ min: 20, max: 20 }),
    curve({ radius: 20, angle: 90 }),
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
