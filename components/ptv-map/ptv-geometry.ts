import {
  FLAGSTAFF,
  FLINDERS_STREET,
  MELBOURNE_CENTRAL,
  NORTH_MELBOURNE,
  PARLIAMENT,
  RICHMOND,
  SOUTHERN_CROSS,
} from "../../server/data/station-ids";
import { bake } from "./bake";
import {
  curve,
  Geometry,
  interchangeMarker,
  Line,
  Path,
  split,
  straight,
} from "./geometry";

const long45 = Math.cos(Math.PI / 4);
const short45 = 1 - Math.cos(Math.PI / 4);
const diagonal = 1 / Math.sqrt(2);

function radiusOf45DegAngleBox(size: number) {
  return size / (-1 + Math.sin(Math.PI / 4) + Math.cos(Math.PI / 4));
}

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

const gippslandLine: Line = {
  x: -80,
  y: -22,
  angle: 0,
  color: "purple",
  path: [
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
  ],
};

const otherRegionalLines: Line = {
  x: -70,
  y: -28,
  angle: 180,
  color: "purple",
  path: [
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
  ],
};

const x = 25 + 15 * short45 - 5 * diagonal;
const y = 15 * long45 + 25 * diagonal;
const w = 15 + x;
const h = 35 + y;
const r = (w - y) / (long45 - short45);
const d = (w - r * long45) / diagonal;
const r2 = 20;
const l1 = (x - short45 * r2) / diagonal;
const l2 = h - l1 * diagonal - long45 * r2;

const northernGroup: Line = {
  x: 0,
  y: 0,
  angle: 180,
  color: "yellow",
  path: [
    interchangeMarker({ id: FLINDERS_STREET }),
    straight({ min: 40, max: 40 }),
    curve({ radius: 15, angle: 90 }),
    straight({ min: 10, max: 10 }),
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
        straight({ min: 40, max: 40 }),
        interchangeMarker({ id: MELBOURNE_CENTRAL }),
        straight({ min: 20, max: 20 }),
        curve({ radius: 15, angle: 90 }),
        interchangeMarker({ id: PARLIAMENT }),
        straight({ min: 30, max: 30 }),
        curve({ radius: 15, angle: 90 }),
        straight({ min: 20, max: 20 }),
        // FLINDERS_STREET
      ],
    }),

    interchangeMarker({ id: NORTH_MELBOURNE }),
  ],
};

const cliftonHillGroup: Line = {
  x: 0,
  y: 5,
  angle: 180,
  color: "red",
  path: [
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
  ],
};

const burnleyGroup: Line = {
  x: 0,
  y: 10,
  angle: 180,
  color: "blue",
  path: [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 25, angle: 90 }),
    straight({ min: 10, max: 10 }),
    // SOUTHERN_CROSS
    straight({ min: 20, max: 20 }),
    curve({ radius: 25, angle: 90 }),
    // FLAGSTAFF
    straight({ min: 40, max: 40 }),
    // MELBOURNE_CENTRAL
    straight({ min: 20, max: 20 }),
    curve({ radius: 25, angle: 90 }),
    // PARLIAMENT
    ...richmondLoopExit({
      width: 45,
      height: 55,
      directStraight: 40,
      directRadius: 35,
      directExtension: 10,
      loopExtension: 25,
    }),
    interchangeMarker({ id: RICHMOND }),
  ],
};

const dandenongGroup: Line = {
  x: 0,
  y: 15,
  angle: 180,
  color: "cyan",
  path: [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 30, angle: 90 }),
    straight({ min: 10, max: 10 }),
    // SOUTHERN_CROSS
    straight({ min: 20, max: 20 }),
    curve({ radius: 30, angle: 90 }),
    interchangeMarker({ id: FLAGSTAFF }),
    straight({ min: 40, max: 40 }),
    interchangeMarker({ id: MELBOURNE_CENTRAL }),
    straight({ min: 20, max: 20 }),
    curve({ radius: 30, angle: 90 }),
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
  ],
};

const werribeeWilliamstown: Line = {
  x: 0,
  y: 25,
  angle: 180,
  color: "green",
  path: [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 40, angle: 90 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: SOUTHERN_CROSS }),
    straight({ min: 35, max: 35 }),
    curve({ radius: 15, angle: -45 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: NORTH_MELBOURNE }),
  ],
};

const frankston: Line = {
  x: 0,
  y: 25,
  angle: 0,
  color: "green",
  path: [
    // FLINDERS_STREET
    straight({ min: 40, max: 40 }),
    curve({ radius: 20, angle: 45 }),
    straight({ min: 10, max: 10 }),
    // RICHMOND
  ],
};

const sandringham: Line = {
  x: 0,
  y: 30,
  angle: 0,
  color: "pink",
  path: [
    interchangeMarker({ id: FLINDERS_STREET }),
    straight({ min: 40, max: 40 }),
    curve({ radius: 15, angle: 45 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: RICHMOND }),
  ],
};

const raw: Geometry = [
  gippslandLine,
  otherRegionalLines,

  cliftonHillGroup,
  dandenongGroup,
  burnleyGroup,
  northernGroup,
  werribeeWilliamstown,
  frankston,
  sandringham,
];

export const ptvGeometry = bake(raw);
