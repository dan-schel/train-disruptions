import { describe, expect, it } from "vitest";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { fp } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { GeometryBuilder } from "@/scripts/generate-map-geometry/lib/builder/geometry-builder";
import { InterchangeBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/interchange-blueprint";

describe("GeometryBuilder", () => {
  it("builds the geometry as expected", () => {
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
        .node(node.CYAN_1)
        .straight(flexi(45, 90))
        .node(node.CYAN_2)
        .straight(flexi(5))
        .split({
          split: new PathBlueprint()
            .curve(flexi(15), 45)
            .straight(flexi(25, 50))
            .node(node.CYAN_3),
        })
        .curve(flexi(10), -45)
        .straight(flexi(45, 90))
        .node(node.CYAN_4),
    });

    const line2 = new LineBlueprint({
      origin: fp([0, 5]),
      angle: 0,
      color: "purple",
      path: new PathBlueprint()
        .node(node.PURPLE_1)
        .straight(flexi(45, 90))
        .node(node.PURPLE_2)
        .straight(flexi(5))
        .curve(flexi(10), 45)
        .straight(flexi(45, 90))
        .node(node.PURPLE_3),
    });

    const geometry = new GeometryBuilder().build(
      [line1, line2],
      [interchange],
      [node.CYAN_1, node.CYAN_3, node.CYAN_4, node.PURPLE_1, node.PURPLE_3],
    );

    expect(JSON.stringify(geometry.toJSON(), null, 2)).toMatchSnapshot();
  });
});
