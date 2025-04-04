import { Range } from "@/server/data/utils/range";
import { groupBy } from "@dan-schel/js-utils";

export class MapSegment {
  constructor(
    readonly mapNodeA: number,
    readonly mapNodeB: number,
    readonly percentage: Range,
  ) {
    if (mapNodeA === mapNodeB) {
      throw new Error("Map nodes cannot be the same.");
    }

    if (percentage.min < 0) {
      throw new Error("Min percentage cannot be less than 0.");
    }
    if (percentage.max > 1) {
      throw new Error("Max percentage cannot be greater than 1.");
    }
  }

  reverse(): MapSegment {
    return new MapSegment(
      this.mapNodeB,
      this.mapNodeA,
      new Range(1 - this.percentage.max, 1 - this.percentage.min),
    );
  }

  normalize(): MapSegment {
    if (this.mapNodeA < this.mapNodeB) {
      return this;
    } else {
      return this.reverse();
    }
  }

  equals(other: MapSegment): boolean {
    const thisNormalized = this.normalize();
    const otherNormalized = other.normalize();

    return (
      thisNormalized.mapNodeA === otherNormalized.mapNodeA &&
      thisNormalized.mapNodeB === otherNormalized.mapNodeB &&
      thisNormalized.percentage.equals(otherNormalized.percentage)
    );
  }

  withRange(range: Range): MapSegment {
    return new MapSegment(this.mapNodeA, this.mapNodeB, range);
  }

  static condense(segments: MapSegment[]): MapSegment[] {
    function key(s: MapSegment): string {
      return `${s.mapNodeA}-${s.mapNodeB}`;
    }

    const normalizedSegments = segments.map((s) => s.normalize());
    return groupBy(normalizedSegments, key).flatMap((group) => {
      const ranges = group.items.map((i) => i.percentage);
      const condensedRanges = Range.condense(ranges);
      return condensedRanges.map((r) => group.items[0].withRange(r));
    });
  }
}
