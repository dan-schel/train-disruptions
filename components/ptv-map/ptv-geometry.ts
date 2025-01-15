import {
  FLAGSTAFF,
  FLINDERS_STREET,
  MELBOURNE_CENTRAL,
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
  split,
  straight,
} from "./geometry";

function radiusOf45DegAngleBox(size: number) {
  return size / (-1 + Math.sin(Math.PI / 4) + Math.cos(Math.PI / 4));
}

function sizeOf45DegAngleBox(radius: number) {
  return radius * (-1 + Math.sin(Math.PI / 4) + Math.cos(Math.PI / 4));
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
    straight({ min: 30, max: 30 }),
    curve({ radius: 25, angle: 45 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: RICHMOND }),
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
    straight({ min: 30, max: 30 }),
  ],
};

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
    straight({ min: 20, max: 20 }),
    curve({
      radius: radiusOf45DegAngleBox(15),
      angle: -45,
    }),
    split({
      reverse: true,
      split: [
        curve({
          radius: radiusOf45DegAngleBox(15),
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
    straight({ min: 60, max: 60 }),
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
    straight({
      min: 55 - sizeOf45DegAngleBox(30),
      max: 55 - sizeOf45DegAngleBox(30),
    }),
    curve({ radius: 30, angle: -45 }),
    split({
      reverse: true,
      split: [
        curve({ radius: 30, angle: -45 }),
        straight({
          min: 45 - sizeOf45DegAngleBox(30),
          max: 45 - sizeOf45DegAngleBox(30),
        }),
        // FLINDERS_STREET
      ],
    }),
    // RICHMOND,
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
    straight({
      min: 60 - sizeOf45DegAngleBox(30),
      max: 60 - sizeOf45DegAngleBox(30),
    }),
    curve({ radius: 30, angle: -45 }),
    split({
      reverse: true,
      split: [
        curve({ radius: 30, angle: -45 }),
        straight({
          min: 50 - sizeOf45DegAngleBox(30),
          max: 50 - sizeOf45DegAngleBox(30),
        }),
        // FLINDERS_STREET
      ],
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
    straight({ min: 60, max: 60 }),
  ],
};

const frankston: Line = {
  x: 0,
  y: 25,
  angle: 0,
  color: "green",
  path: [
    // FLINDERS_STREET
    straight({ min: 30, max: 30 }),
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
    straight({ min: 30, max: 30 }),
    curve({ radius: 15, angle: 45 }),
    straight({ min: 10, max: 10 }),
    interchangeMarker({ id: RICHMOND }),
  ],
};

const raw: Geometry = [
  gippslandLine,
  otherRegionalLines,

  cliftonHillGroup,
  burnleyGroup,
  dandenongGroup,
  northernGroup,
  werribeeWilliamstown,
  frankston,
  sandringham,
];

export const ptvGeometry = bake(raw);
