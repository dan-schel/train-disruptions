import { Interchange } from "@/components/map/renderer/interchange";
import { DualPoint } from "@/components/map/renderer/dual-point";
import {
  InterchangeBlueprint,
  PointPosition,
} from "@/scripts/generate-map-geometry/lib/blueprint/interchange-blueprint";
import { LocatedInterchange } from "@/scripts/generate-map-geometry/lib/builder/path";
import {
  interchangeEdgeOffset,
  interchangeInnerOffset,
} from "@/scripts/generate-map-geometry/lib/utils";

export class InterchangeBuilder {
  constructor(
    private readonly _interchange: InterchangeBlueprint,
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

  build(): Interchange {
    const thickLines = this._interchange.thickLines.map((segment) =>
      segment.map((pos) => this._point(pos)),
    );

    const thinLine =
      this._interchange.thinLine?.map((pos) => this._point(pos)) ?? null;

    return new Interchange(thickLines, thinLine);
  }

  _point(pointPosition: PointPosition): DualPoint {
    const point = this._locatePoint(pointPosition.point);

    const offset = {
      "left-edge": { length: interchangeEdgeOffset, angle: -90 },
      "left-inner": { length: interchangeInnerOffset, angle: -90 },
      "right-inner": { length: interchangeInnerOffset, angle: 90 },
      "right-edge": { length: interchangeEdgeOffset, angle: 90 },
    }[pointPosition.position];

    return point.point
      .move(offset.length, point.angle + offset.angle)
      .toDualPoint();
  }

  _locatePoint(id: string): LocatedInterchange {
    const point = this._locatedPoints.find((x) => x.interchangePoint.id === id);

    if (point == null) {
      throw new Error(`Point "${id}" not found.`);
    }

    return point;
  }
}
