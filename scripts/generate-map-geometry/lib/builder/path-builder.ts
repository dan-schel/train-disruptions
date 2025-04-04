import { FlexiPoint } from "@/scripts/generate-map-geometry/lib/dimensions/flexi-point";
import {
  Path,
  LocatedTerminus,
  LocatedNode,
} from "@/scripts/generate-map-geometry/lib/builder/path";

export class PathBuilder {
  private _currentPoint: FlexiPoint;
  private _currentAngle: number;

  private readonly _points: FlexiPoint[];
  private readonly _locatedNodes: LocatedNode[];
  private readonly _termini: LocatedTerminus[];
  private readonly _subPaths: Path[];

  constructor(start: FlexiPoint, startAngle: number) {
    this._currentPoint = start;
    this._currentAngle = startAngle;

    this._points = [start];
    this._locatedNodes = [];
    this._termini = [];
    this._subPaths = [];
  }

  getCurrentPoint(): FlexiPoint {
    return this._currentPoint;
  }

  getCurrentAngle(): number {
    return this._currentAngle;
  }

  addPoint(point: FlexiPoint) {
    this._points.push(point);
    this._currentPoint = point;
  }

  addAngle(angle: number) {
    this._currentAngle += angle;
  }

  addNode(node: LocatedNode) {
    this._locatedNodes.push(node);
  }

  addTerminus(terminus: LocatedTerminus) {
    this._termini.push(terminus);
  }

  subpath(build: (builder: PathBuilder) => void) {
    const builder = new PathBuilder(this._currentPoint, this._currentAngle);
    build(builder);
    this._subPaths.push(...builder.getResult());
  }

  getResult(): Path[] {
    const myPath = new Path(this._points, this._locatedNodes, this._termini);
    return [myPath, ...this._subPaths];
  }
}
