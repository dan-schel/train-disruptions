/** Literally a pair of station IDs, in no particular order. */
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

  equals(other: StationPair) {
    return this.includes(other.a) && this.includes(other.b);
  }
}
