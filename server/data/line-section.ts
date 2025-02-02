export class LineSection {
  constructor(
    readonly stationA: number,
    readonly stationB: number | "the-city",
  ) {}

  // TODO: Will have some sort of toMapSection() method, which takes in the line
  // route and returns the data the map needs to highlight this section.

  // TODO: Also some sort of validate() method? If we include a station not on
  // the line, that's an issue!
}
