export class StationPair {
  constructor(
    readonly a: number,
    readonly b: number,
  ) {
    if (a === b) {
      throw new Error(`Invalid station pair: ${a} and ${b}.`);
    }
  }

  includes(station: number) {
    return this.a === station || this.b === station;
  }

  static arrayToPairs(array: number[]): StationPair[] {
    return array
      .slice(0, -1)
      .map((station, i) => new StationPair(station, array[i + 1]));
  }
}
