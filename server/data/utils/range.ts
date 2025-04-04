// Floating point fudge factor! (Numbers this close are considered equal.)
const fpff = 0.000001;

export class Range {
  constructor(
    readonly min: number,
    readonly max: number,
  ) {
    if (min > max) {
      throw new Error("Min cannot be greater than max.");
    }
  }

  equals(other: Range): boolean {
    return (
      Math.abs(this.min - other.min) < fpff &&
      Math.abs(this.max - other.max) < fpff
    );
  }

  static condense(ranges: Range[]): Range[] {
    if (ranges.length < 2) return ranges;

    const sortedRanges = ranges.sort((a, b) => a.min - b.min);

    const condensed: Range[] = [];
    let currentMin = sortedRanges[0].min;
    let currentMax = sortedRanges[0].max;

    for (let i = 1; i < sortedRanges.length; i++) {
      const range = sortedRanges[i];

      if (currentMax < range.min - fpff) {
        // If this range is not overlapping the current range, then this must be
        // the start of a new separate section.
        condensed.push(new Range(currentMin, currentMax));
        currentMin = range.min;
        currentMax = range.max;
      } else if (range.max > currentMax) {
        // Otherwise, if it IS overlapping, and this range pushes the max out
        // further, update the max.
        currentMax = range.max;
      }
    }

    condensed.push(new Range(currentMin, currentMax));
    return condensed;
  }
}
