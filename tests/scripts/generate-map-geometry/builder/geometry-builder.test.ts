import { describe, expect, it } from "vitest";
import { InterchangeBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/interchange-blueprint";
import { LineBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/line-blueprint";
import { fp } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { flexi } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-length";
import { GeometryBuilder } from "@/scripts/generate-map-geometry/lib/builder/geometry-builder";

describe("GeometryBuilder", () => {
  it("builds the geometry as expected", () => {
    const interchange = InterchangeBlueprint.simple(
      1,
      ["line1", "line2"],
      "line1",
      "left-edge",
      "line2",
      "right-edge",
    );

    const line1 = new LineBlueprint({
      origin: fp([0, 0]),
      angle: 0,
      color: "cyan",
      path: new PathBlueprint()
        .terminus()
        .straight(flexi(45, 90))
        .station(interchange.point("line1"))
        .straight(flexi(5))
        .split({
          split: new PathBlueprint()
            .curve(flexi(15), 45)
            .straight(flexi(25, 50))
            .terminus(),
        })
        .curve(flexi(10), -45)
        .straight(flexi(45, 90))
        .terminus(),
    });

    const line2 = new LineBlueprint({
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

    expect(JSON.stringify(geometry.toJSON(), null, 2)).toMatchSnapshot();
  });
});
