import { FlexiPoint } from "../dimensions/flexi-point";
import { Path, LocatedInterchange, LocatedTerminus } from "./path";

export class PathBuilder {
  private _currentPoint: FlexiPoint;
  private _currentAngle: number;

  private readonly _points: FlexiPoint[];
  private readonly _locatedInterchanges: LocatedInterchange[];
  private readonly _termini: LocatedTerminus[];
  private readonly _subPaths: Path[];

  constructor(start: FlexiPoint, startAngle: number) {
    this._currentPoint = start;
    this._currentAngle = startAngle;

    this._points = [start];
    this._locatedInterchanges = [];
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

  addInterchange(interchange: LocatedInterchange) {
    this._locatedInterchanges.push(interchange);
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
    const myPath = new Path(
      this._points,
      this._locatedInterchanges,
      this._termini,
    );
    return [myPath, ...this._subPaths];
  }
}
