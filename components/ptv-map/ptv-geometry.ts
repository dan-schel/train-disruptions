import { FLINDERS_STREET } from "../../server/data/station-ids";
import { bake } from "./bake";
import {
  curve,
  Geometry,
  interchangeMarker,
  Line,
  split,
  straight,
} from "./geometry";

const northernGroup: Line = {
  x: 0,
  y: 0,
  angle: 180,
  color: "blue",
  path: [
    interchangeMarker({ id: FLINDERS_STREET }),
    straight({ min: 20, max: 40 }),
    curve({ radius: 20, angle: 90 }),
    straight({ min: 20, max: 40 }),
    split({ split: [curve({ radius: 20, angle: 90 })], reverse: true }),
    straight({ min: 20, max: 40 }),
    interchangeMarker({ id: FLINDERS_STREET }),
  ],
};

const cliftonHillGroup: Line = {
  x: 0,
  y: -10,
  angle: 180,
  color: "red",
  path: [],
};

const raw: Geometry = [northernGroup, cliftonHillGroup];

export const ptvGeometry = bake(raw);
