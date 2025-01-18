import { curve, Path, straight } from "../../lib/geometry";

export function frankstonLine(): Path[] {
  return [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 20, angle: 45 }),
    straight({ min: 10, max: 10 }),
    // RICHMOND
  ];
}
