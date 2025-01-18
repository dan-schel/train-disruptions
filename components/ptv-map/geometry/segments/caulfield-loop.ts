import {
  FLAGSTAFF,
  MELBOURNE_CENTRAL,
  PARLIAMENT,
} from "../../../../server/data/station-ids";
import {
  curve,
  interchangeMarker,
  Path,
  split,
  straight,
} from "../../lib/geometry";
import { flagstaffToParliament } from "./flagstaff-to-parliament";

function richmondLoopExit(dimensions: {
  width: number;
  height: number;
  directStraight: number;
  directRadius: number;
  directExtension: number;
  loopExtension: number;
}) {
  const {
    width,
    height,
    directStraight,
    directRadius,
    directExtension,
    loopExtension,
  } = dimensions;

  const cos45 = Math.cos(Math.PI / 4);
  const off = width - directStraight;
  const exitLoopRadius =
    (directRadius * cos45 +
      (directExtension - loopExtension) / Math.sqrt(2) -
      off) /
    (1 - cos45);

  const sin45 = Math.sin(Math.PI / 4);
  const r = exitLoopRadius;
  const exitLoopStraight =
    height +
    (1 - sin45) * directRadius +
    (directExtension - loopExtension) / Math.sqrt(2) -
    r * sin45;

  return [
    straight({
      min: exitLoopStraight,
      max: exitLoopStraight,
    }),
    curve({ radius: exitLoopRadius, angle: -45 }),
    straight({ min: loopExtension, max: loopExtension }),
    split({
      reverse: true,
      split: [
        straight({ min: directExtension, max: directExtension }),
        curve({ radius: directRadius, angle: -45 }),
        straight({
          min: directStraight,
          max: directStraight,
        }),
      ],
    }),
  ];
}

export function caulfieldLoop(): Path[] {
  return [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 30, angle: 90 }),
    straight({ min: 10, max: 10 }),
    // SOUTHERN_CROSS
    straight({ min: 20, max: 20 }),
    curve({ radius: 30, angle: 90 }),
    interchangeMarker({ id: FLAGSTAFF }),
    ...flagstaffToParliament(3),
    interchangeMarker({ id: PARLIAMENT }),
    ...richmondLoopExit({
      width: 50,
      height: 60,
      directStraight: 40,
      directRadius: 30,
      directExtension: 10,
      loopExtension: 20,
    }),
    // RICHMOND,
  ];
}
