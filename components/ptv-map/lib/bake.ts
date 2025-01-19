import { FlexiPoint } from "./flexi-point";
import { Geometry, LineColor } from "./geometry";
import { CurvedPathPiece } from "./path/curved-path-piece";
import { Path } from "./path/path";
import { PathPiece } from "./path/path-piece";
import { SplitPathPiece } from "./path/split-path-piece";
import { StationLocation } from "./path/station-location";
import { StraightPathPiece } from "./path/straight-path-piece";

export type BakedInterchangeMarker = {
  a: FlexiPoint;
  b: FlexiPoint;
};

export type BakedLineSegment = {
  color: LineColor;
  points: FlexiPoint[];
};

export type BakedGeometry = {
  interchangeMarkers: BakedInterchangeMarker[];
  lineSegments: BakedLineSegment[];
};

type LocatedInterchange = { id: number; point: FlexiPoint };

export function bake(geometry: Geometry): BakedGeometry {
  const lineSegments: BakedLineSegment[] = [];
  const locatedInterchanges: LocatedInterchange[] = [];

  for (const line of geometry) {
    const origin = FlexiPoint.formalize(line.origin);

    const bakedLine = PathBaker.bake(
      origin.min.x,
      origin.min.y,
      origin.max.x,
      origin.max.y,
      line.angle,
      line.color,
      line.path,
    );
    lineSegments.push(...bakedLine.lineSegments);
    locatedInterchanges.push(...bakedLine.locatedInterchanges);
  }

  const interchangeMarkers: BakedInterchangeMarker[] = [];
  locatedInterchanges.sort((a, b) => a.id - b.id);

  collectedRepeatedValues(
    locatedInterchanges,
    (item) => item.id,
    (items) => {
      if (items.length === 2) {
        interchangeMarkers.push({ a: items[0].point, b: items[1].point });
      } else {
        throw new Error(
          `Interchange marker with ID ${items[0].id} has ${items.length} points.`,
        );
      }
    },
  );

  return {
    interchangeMarkers,
    lineSegments,
  };
}

// TODO: [DS] Can probably make this more concise by using a baked point class
// with good methods, instead of always dealing with minX, minY, maxX, maxY.
class PathBaker {
  private readonly _points: FlexiPoint[] = [];
  private readonly _branches: BakedLineSegment[] = [];
  private readonly _locatedInterchanges: LocatedInterchange[] = [];

  constructor(
    private _minX: number,
    private _minY: number,
    private _maxX: number,
    private _maxY: number,
    private _angle: number,
    private readonly _color: LineColor,
  ) {
    this._commitPoint();
  }

  static bake(
    minX: number,
    minY: number,
    maxX: number,
    maxY: number,
    angle: number,
    color: LineColor,
    path: Path,
  ) {
    const baker = new PathBaker(minX, minY, maxX, maxY, angle, color);

    for (const piece of path.pieces) {
      baker.applyPiece(piece);
    }

    return baker.build();
  }

  build() {
    return {
      lineSegments: [
        { color: this._color, points: this._points },
        ...this._branches,
      ],
      locatedInterchanges: this._locatedInterchanges,
    };
  }

  // TODO: [DS] Move this logic to the pieces themsleves.
  applyPiece(piece: PathPiece) {
    if (piece instanceof StraightPathPiece) {
      this.applyStraight(piece);
    } else if (piece instanceof CurvedPathPiece) {
      this.applyCurve(piece);
    } else if (piece instanceof SplitPathPiece) {
      this.applySplit(piece);
    } else if (piece instanceof StationLocation) {
      this.applyStationLocation(piece);
    } else {
      throw new Error(`Unknown path piece type: ${piece}`);
    }
  }

  applyStraight(piece: StraightPathPiece) {
    const { min, max } = piece.length;
    this._minX += Math.cos(rad(this._angle)) * min;
    this._minY += Math.sin(rad(this._angle)) * min;
    this._maxX += Math.cos(rad(this._angle)) * max;
    this._maxY += Math.sin(rad(this._angle)) * max;
    this._commitPoint();
  }

  applyCurve(piece: CurvedPathPiece) {
    let centerMinX = this._minX;
    let centerMinY = this._minY;
    let centerMaxX = this._maxX;
    let centerMaxY = this._maxY;

    const centerAngle = piece.angle < 0 ? this._angle - 90 : this._angle + 90;
    centerMinX += Math.cos(rad(centerAngle)) * piece.radius;
    centerMinY += Math.sin(rad(centerAngle)) * piece.radius;
    centerMaxX += Math.cos(rad(centerAngle)) * piece.radius;
    centerMaxY += Math.sin(rad(centerAngle)) * piece.radius;

    const segments = Math.round(Math.abs(piece.angle) / 9);
    for (let i = 1; i <= segments; i++) {
      const angle = centerAngle + 180 + (piece.angle / segments) * i;
      const minX = centerMinX + Math.cos(rad(angle)) * piece.radius;
      const minY = centerMinY + Math.sin(rad(angle)) * piece.radius;
      const maxX = centerMaxX + Math.cos(rad(angle)) * piece.radius;
      const maxY = centerMaxY + Math.sin(rad(angle)) * piece.radius;

      this._minX = minX;
      this._minY = minY;
      this._maxX = maxX;
      this._maxY = maxY;
      this._commitPoint();
    }

    this._angle += piece.angle;
  }

  applySplit(piece: SplitPathPiece) {
    const split = PathBaker.bake(
      this._minX,
      this._minY,
      this._maxX,
      this._maxY,
      this._angle + (piece.reversed ? 180 : 0),
      this._color,
      piece.split,
    );
    this._branches.push(...split.lineSegments);
    this._locatedInterchanges.push(...split.locatedInterchanges);
  }

  applyStationLocation(piece: StationLocation) {
    if (piece.interchangePoint?.render) {
      this._locatedInterchanges.push({
        id: piece.id,
        point: FlexiPoint.formalize({
          min: { x: this._minX, y: this._minY },
          max: { x: this._maxX, y: this._maxY },
        }),
      });
    }
  }

  _commitPoint() {
    this._points.push(
      FlexiPoint.formalize({
        min: { x: this._minX, y: this._minY },
        max: { x: this._maxX, y: this._maxY },
      }),
    );
  }
}

function rad(deg: number) {
  return deg * (Math.PI / 180);
}

function collectedRepeatedValues<T>(
  array: T[],
  selector: (item: T) => number,
  action: (item: T[]) => void,
) {
  let current: number | null = null;
  const values: T[] = [];

  for (const item of array) {
    const value = selector(item);
    if (value !== current) {
      current = value;

      if (values.length !== 0) {
        action(values);
        values.length = 0;
      }
    }

    values.push(item);
  }

  if (values.length !== 0) {
    action(values);
  }
}
