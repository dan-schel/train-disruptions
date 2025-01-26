import { flexi } from "../lib/dimensions/flexi-length";
import { fp } from "../lib/dimensions/flexi-point";
import { InterchangeBlueprint } from "../lib/blueprint/interchange-blueprint";
import { LineBlueprint } from "../lib/blueprint/line-blueprint";
import { PathBlueprint } from "../lib/blueprint/path-blueprint";
import { GeometryBuilder } from "../lib/builder/geometry-builder";

const interchange = InterchangeBlueprint.simple(
  1,
  ["line1", "line2"],
  "line1",
  "left-edge",
  "line2",
  "right-edge",
);

export const line1 = new LineBlueprint({
  origin: fp([0, 0]),
  angle: 0,
  color: "cyan",
  path: new PathBlueprint()
    .terminus()
    .straight(flexi(45, 90))
    .station(interchange.point("line1"))
    .straight(flexi(5))
    .curve(flexi(10), -45)
    .straight(flexi(45, 90))
    .terminus(),
});

export const line2 = new LineBlueprint({
  origin: fp([0, 5]),
  angle: 0,
  color: "purple",
  path: new PathBlueprint()
    .terminus()
    .straight(flexi(45, 90))
    .station(interchange.point("line2"))
    .straight(flexi(5))
    .curve(flexi(10), 45)
    .straight(flexi(45, 90))
    .terminus(),
});

const geometry = new GeometryBuilder().build([line1, line2]);

export default geometry;
