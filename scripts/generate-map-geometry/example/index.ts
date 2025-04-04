import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { fp } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { InterchangeBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/interchange-blueprint";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { GeometryBuilder } from "@/scripts/generate-map-geometry/lib/builder/geometry-builder";

const node = {
  CYAN_1: 1,
  CYAN_2: 2,
  CYAN_3: 3,
  CYAN_4: 4,
  PURPLE_1: 5,
  PURPLE_2: 6,
  PURPLE_3: 7,
};

const interchange = InterchangeBlueprint.simple(
  1,
  [node.CYAN_2, node.PURPLE_2],
  node.CYAN_2,
  "left-edge",
  node.PURPLE_2,
  "right-edge",
);

const line1 = new LineBlueprint({
  origin: fp([0, 0]),
  angle: 0,
  color: "cyan",
  path: new PathBlueprint()
    .terminus()
    .node(node.CYAN_1)
    .straight(flexi(45, 90))
    .node(node.CYAN_2)
    .straight(flexi(5))
    .split({
      split: new PathBlueprint()
        .curve(flexi(15), 45)
        .straight(flexi(25, 50))
        .node(node.CYAN_3)
        .terminus(),
    })
    .curve(flexi(10), -45)
    .straight(flexi(45, 90))
    .node(node.CYAN_4)
    .terminus(),
});

const line2 = new LineBlueprint({
  origin: fp([0, 5]),
  angle: 0,
  color: "purple",
  path: new PathBlueprint()
    .terminus()
    .node(node.PURPLE_1)
    .straight(flexi(45, 90))
    .node(node.PURPLE_2)
    .straight(flexi(5))
    .curve(flexi(10), 45)
    .straight(flexi(45, 90))
    .node(node.PURPLE_3)
    .terminus(),
});

const geometry = new GeometryBuilder().build([line1, line2], [interchange]);

export default geometry;
