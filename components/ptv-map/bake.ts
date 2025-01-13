import {
  Curve,
  Geometry,
  InterchangeMarker,
  LineColor,
  Path,
  ReverseSplit,
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

  // TODO: [DS] Create interchange markers by looking for pairs of located
  // interchange points with the same ID. They're each end of the line.
  return {
    interchangeMarkers: [],
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
      case "reverse-split":
        this.applyReverseSplit(piece);
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
    // TODO: [DS] This demonstrates that it's annoying to bake the min and max
    // points at the same time, but the alternative (baking twice and lerping at
    // render-time) is even worse. We'd have to create more types to represent
    // the intermediate stages, because baking would become a four-step process:
    //
    //   1. Split the path into a min path and a max path.
    //   2. Bake the min path.
    //   3. Bake the max path.
    //   4. Join min and max paths together (or lerp at render-time).
    //
    // I think this function will look nicer if we can split the curve building
    // logic into a separate function and apply it twice.
    //
    // Also right now it's broken lol. The curve does not look right. The center
    // should be different depending on whether we're curving clockwise or
    // anticlockwise, and the current code doesn't seem to account for that, so
    // that's something to look into.

    const minCenterX = this._minX + Math.cos(rad(this._angle)) * piece.radius;
    const minCenterY = this._minY + Math.sin(rad(this._angle)) * piece.radius;
    const maxCenterX = this._maxX + Math.cos(rad(this._angle)) * piece.radius;
    const maxCenterY = this._maxY + Math.sin(rad(this._angle)) * piece.radius;

    const segments = 10;

    for (let i = 0; i < segments; i++) {
      const angle = this._angle + (piece.angle / segments) * i;
      const minX = minCenterX + Math.cos(rad(angle)) * piece.radius;
      const minY = minCenterY + Math.sin(rad(angle)) * piece.radius;
      const maxX = maxCenterX + Math.cos(rad(angle)) * piece.radius;
      const maxY = maxCenterY + Math.sin(rad(angle)) * piece.radius;

      this._minX = minX;
      this._minY = minY;
      this._maxX = maxX;
      this._maxY = maxY;
      this._commitPoint();
    }
    this._angle += piece.angle;
  }

  applySplit(piece: Split) {
    // TODO: [DS] Implement this.
  }

  applyReverseSplit(piece: ReverseSplit) {
    // TODO: [DS] Might be better to make reverse-split a variant of split,
    // rather than a separate type.
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
