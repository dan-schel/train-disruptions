import { bake } from "../lib/baked/bake";
import { flexi } from "../lib/dimensions/flexi-length";
import { fp } from "../lib/dimensions/flexi-point";
import { Interchange } from "../lib/interchange";
import { Line } from "../lib/line";
import { Path } from "../lib/path/path";

const interchange = Interchange.simple(
  1,
  ["line1", "line2"],
  "line1",
  "left-edge",
  "line2",
  "right-edge",
);

export const line1 = new Line({
  origin: fp([0, 0]),
  angle: 0,
  color: "cyan",
  path: new Path()
    .terminus()
    .straight(flexi(45, 90))
    .station(interchange.point("line1"))
    .straight(flexi(5))
    .curve(flexi(10), -45)
    .straight(flexi(45, 90))
    .terminus(),
});

export const line2 = new Line({
  origin: fp([0, 5]),
  angle: 0,
  color: "purple",
  path: new Path()
    .terminus()
    .straight(flexi(45, 90))
    .station(interchange.point("line2"))
    .straight(flexi(5))
    .curve(flexi(10), 45)
    .straight(flexi(45, 90))
    .terminus(),
});

const geometry = bake([line1, line2]);

export default geometry;
