import { InterchangePoint } from "./path-blueprint-piece/station-location";

export type RelativePosition =
  | "left-edge"
  | "left-inner"
  | "right-inner"
  | "right-edge";

export type PointPosition<T extends string[] = string[]> = {
  readonly point: T[number];
  readonly position: RelativePosition;
};

export class InterchangeBlueprint<T extends string[] = string[]> {
  constructor(
    readonly station: number,
    readonly points: T,
    readonly thickLines: PointPosition<T>[][],
    readonly thinLine: PointPosition<T>[] | null,
  ) {
    const noThickLines = thickLines.length === 0;
    const thickLinesInvalid = thickLines.some((l) => l.length < 2);
    const thinLineInvalid = thinLine != null && thinLine.length < 2;
    if (noThickLines || thickLinesInvalid || thinLineInvalid) {
      throw new Error("Invalid baked interchange geometry.");
    }
  }

  point(id: T[number]) {
    return new InterchangePoint(this, id);
  }

  static single<T extends string>(
    station: number,
    point: T,
  ): InterchangeBlueprint<[T]> {
    return new InterchangeBlueprint(
      station,
      [point],
      [
        [
          { point, position: "left-edge" },
          { point, position: "right-edge" },
        ],
      ],
      null,
    );
  }

  static simple<T extends string[]>(
    station: number,
    points: T,
    startPoint: T[number],
    startEdge: RelativePosition,
    endPoint: T[number],
    endEdge: RelativePosition,
  ): InterchangeBlueprint<T> {
    return new InterchangeBlueprint(
      station,
      points,
      [
        [
          { point: startPoint, position: startEdge },
          { point: endPoint, position: endEdge },
        ],
      ],
      null,
    );
  }
}
