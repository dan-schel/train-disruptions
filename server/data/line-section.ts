export class LineSection {
  // This only works for branching lines if we use two separate LineSections.
  //
  // Also, it's gonna be fun when the Albury line has bus replacements from
  // Broadmeadows to Southern Cross, but the Seymour and Shepparton lines are
  // still running!
  //   A: Some services replaced by buses between Broadmeadows and Southern Cross.
  // TODO: I need to start writing up these edge cases in the docs.
  constructor(
    readonly stationA: number,
    readonly stationB: number | "the-city",
  ) {}
}
