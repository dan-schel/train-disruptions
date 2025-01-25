import { FlexiPoint } from "../dimensions/flexi-point";
import { BakedPath, LocatedInterchange, LocatedTerminus } from "./baked-path";

export class PathBaker {
  private _currentPoint: FlexiPoint;
  private _currentAngle: number;

  private readonly _points: FlexiPoint[];
  private readonly _locatedInterchanges: LocatedInterchange[];
  private readonly _terminii: LocatedTerminus[];
  private readonly _subPaths: BakedPath[];

  constructor(start: FlexiPoint, startAngle: number) {
    this._currentPoint = start;
    this._currentAngle = startAngle;

    this._points = [start];
    this._locatedInterchanges = [];
    this._terminii = [];
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
    this._terminii.push(terminus);
  }

  subpath(build: (baker: PathBaker) => void) {
    const builder = new PathBaker(this._currentPoint, this._currentAngle);
    build(builder);
    this._subPaths.push(...builder.getResult());
  }

  getResult(): BakedPath[] {
    const myPath = new BakedPath(
      this._points,
      this._locatedInterchanges,
      this._terminii,
    );
    return [myPath, ...this._subPaths];
  }
}
