import { curve, Path, split, straight } from "../../lib/geometry";

export function regionalSxsToNme(): Path[] {
  return [
    // SOUTHERN_CROSS
    curve({ radius: 5, angle: 90 }),
    straight({ min: 2, max: 2 }),
    straight({ min: 25, max: 25 }),
    split({
      reverse: false,
      split: [
        straight({ min: 10 / Math.sqrt(2), max: 10 / Math.sqrt(2) }),
        curve({ radius: 20, angle: -45 }),
        straight({ min: 5, max: 5 }),
      ],
    }),
    curve({ radius: 20, angle: -45 }),
    straight({ min: 10, max: 10 }),
  ];
}
