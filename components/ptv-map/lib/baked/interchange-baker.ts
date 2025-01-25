import { interchangeEdgeOffset, interchangeInnerOffset } from "../../utils";
import { Interchange, PointPosition } from "../interchange";
import { BakedInterchange, BakedPoint } from "../../baked-geometry";
import { LocatedInterchange } from "./baked-path";

export class InterchangeBaker {
  constructor(
    private readonly _interchange: Interchange,
    private readonly _locatedPoints: readonly LocatedInterchange[],
  ) {
    const notFound = _interchange.points.find((x) =>
      _locatedPoints.every((y) => y.interchangePoint.id !== x),
    );

    if (notFound != null) {
      throw new Error(
        `No point "${notFound}" found for interchange "${_interchange.station}".`,
      );
    }

    const duplicate = _locatedPoints.find((y) =>
      _locatedPoints.some(
        (x) => x !== y && x.interchangePoint.id === y.interchangePoint.id,
      ),
    );

    if (duplicate != null) {
      throw new Error(
        `Duplicate point "${duplicate.interchangePoint.id}" found for interchange "${_interchange.station}".`,
      );
    }
  }

  bake(): BakedInterchange {
    const thickLines = this._interchange.thickLines.map((segment) =>
      segment.map((pos) => this._point(pos)),
    );

    const thinLine =
      this._interchange.thinLine?.map((pos) => this._point(pos)) ?? null;

    return new BakedInterchange(
      this._interchange.station,
      thickLines,
      thinLine,
    );
  }

  _point(pointPosition: PointPosition): BakedPoint {
    const point = this._locatePoint(pointPosition.point);

    const offset = {
      "left-edge": { length: interchangeEdgeOffset, angle: -90 },
      "left-inner": { length: interchangeInnerOffset, angle: -90 },
      "right-inner": { length: interchangeInnerOffset, angle: 90 },
      "right-edge": { length: interchangeEdgeOffset, angle: 90 },
    }[pointPosition.position];

    return point.point.move(offset.length, point.angle + offset.angle).bake();
  }

  _locatePoint(id: string): LocatedInterchange {
    const point = this._locatedPoints.find((x) => x.interchangePoint.id === id);

    if (point == null) {
      throw new Error(`Point "${id}" not found.`);
    }

    return point;
  }
}
