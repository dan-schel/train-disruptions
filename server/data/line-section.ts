export type LineSectionBoundary = number | "the-city";

export class LineSection {
  constructor(
    readonly from: LineSectionBoundary,
    readonly to: LineSectionBoundary,
  ) {
    if (from === to) {
      throw new Error("Line section must have different from/to boundaries");
    }
  }
}
