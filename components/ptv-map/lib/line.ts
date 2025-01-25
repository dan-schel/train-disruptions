import { PathBaker } from "./baked/path-baker";
import { FlexiPoint, InformalFlexiPoint } from "./dimensions/flexi-point";
import { Path } from "./path/path";
import { ColoredBakedPathCollection } from "./baked/baked-path";
import { LineColor } from "../utils";

export class Line {
  readonly origin: FlexiPoint;
  readonly angle: number;
  readonly color: LineColor;
  readonly path: Path;

  constructor({
    origin,
    angle,
    color,
    path,
  }: {
    origin: InformalFlexiPoint;
    angle: number;
    color: LineColor;
    path: Path;
  }) {
    this.origin = FlexiPoint.formalize(origin);
    this.angle = angle;
    this.color = color;
    this.path = path;
  }

  bake(): ColoredBakedPathCollection {
    const baker = new PathBaker(this.origin, this.angle);
    this.path.bake(baker);
    return new ColoredBakedPathCollection(this.color, baker.getResult());
  }
}
