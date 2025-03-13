import { PathBuilder } from "@/scripts/generate-map-geometry/lib/builder/path-builder";
import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import { PathBlueprint } from "@/scripts/generate-map-geometry/lib/blueprint/path-blueprint";
import { ColoredPathCollection } from "@/scripts/generate-map-geometry/lib/builder/path";
import { LineColor } from "@/components/map/renderer/utils";

export class LineBlueprint {
  readonly origin: FlexiPoint;
  readonly angle: number;
  readonly color: LineColor;
  readonly path: PathBlueprint;

  constructor({
    origin,
    angle,
    color,
    path,
  }: {
    origin: FlexiPoint;
    angle: number;
    color: LineColor;
    path: PathBlueprint;
  }) {
    this.origin = origin;
    this.angle = angle;
    this.color = color;
    this.path = path;
  }

  build(): ColoredPathCollection {
    const builder = new PathBuilder(this.origin, this.angle);
    this.path.build(builder);
    return new ColoredPathCollection(this.color, builder.getResult());
  }
}
