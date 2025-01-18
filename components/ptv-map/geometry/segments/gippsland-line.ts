import { curve, Path, straight } from "../../lib/geometry";

export function gippslandLine(): Path[] {
  return [
    // SOUTHERN_CROSS
    curve({ radius: 5, angle: 90 }),
    straight({ min: 2, max: 2 }),
    curve({ radius: 35, angle: -90 }),
    straight({ min: 40, max: 40 }),
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 25, angle: 45 }),
    straight({ min: 10, max: 10 }),
    // RICHMOND
  ];
}
