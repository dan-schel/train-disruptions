import { PathBuilder } from "../builder/path-builder";
import { FlexiPoint } from "../dimensions/flexi-point";
import { PathBlueprint } from "./path-blueprint";
import { ColoredPathCollection } from "../builder/path";
import { LineColor } from "../../../../components/map/renderer/utils";

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

  bake(): ColoredPathCollection {
    const baker = new PathBuilder(this.origin, this.angle);
    this.path.bake(baker);
    return new ColoredPathCollection(this.color, baker.getResult());
  }
}
