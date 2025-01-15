import {
  Curve,
  Geometry,
  InterchangeMarker,
  LineColor,
  Path,
  Split,
  Straight,
} from "./geometry";

export type BakedPoint = {
  min: { x: number; y: number };
  max: { x: number; y: number };
};

export type BakedInterchangeMarker = {
  a: BakedPoint;
  b: BakedPoint;
};

export type BakedLineSegment = {
  color: LineColor;
  points: BakedPoint[];
};

export type BakedGeometry = {
  interchangeMarkers: BakedInterchangeMarker[];
  lineSegments: BakedLineSegment[];
};

type LocatedInterchange = { id: number; point: BakedPoint };

export function bake(geometry: Geometry): BakedGeometry {
  const lineSegments: BakedLineSegment[] = [];
  const locatedInterchanges: LocatedInterchange[] = [];

  for (const line of geometry) {
    const bakedLine = PathBaker.bake(
      line.x,
      line.y,
      line.x,
      line.y,
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

class PathBaker {
  private readonly _points: BakedPoint[] = [];
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
    path: Path[],
  ) {
    const baker = new PathBaker(minX, minY, maxX, maxY, angle, color);

    for (const piece of path) {
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

  applyPiece(piece: Path) {
    switch (piece.type) {
      case "straight":
        this.applyStraight(piece);
        break;
      case "curve":
        this.applyCurve(piece);
        break;
      case "split":
        this.applySplit(piece);
        break;
      case "interchange-marker":
        this.applyInterchangeMarker(piece);
        break;
      default:
        throw new Error(`Unknown path piece type: ${piece}`);
    }
  }

  applyStraight(piece: Straight) {
    const { min, max } = piece;
    this._minX += Math.cos(rad(this._angle)) * min;
    this._minY += Math.sin(rad(this._angle)) * min;
    this._maxX += Math.cos(rad(this._angle)) * max;
    this._maxY += Math.sin(rad(this._angle)) * max;
    this._commitPoint();
  }

  applyCurve(piece: Curve) {
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

  applySplit(piece: Split) {
    const split = PathBaker.bake(
      this._minX,
      this._minY,
      this._maxX,
      this._maxY,
      this._angle + (piece.reverse ? 180 : 0),
      this._color,
      piece.split,
    );
    this._branches.push(...split.lineSegments);
    this._locatedInterchanges.push(...split.locatedInterchanges);
  }

  applyInterchangeMarker(piece: InterchangeMarker) {
    this._locatedInterchanges.push({
      id: piece.id,
      point: {
        min: { x: this._minX, y: this._minY },
        max: { x: this._maxX, y: this._maxY },
      },
    });
  }

  _commitPoint() {
    this._points.push({
      min: { x: this._minX, y: this._minY },
      max: { x: this._maxX, y: this._maxY },
    });
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
