export type DisplayStringOptions = {
  now: Date;
};

/** Defines how/when the disruption ends. */
export abstract class EndsBase {
  /**
   * The string describing this end condition. Intended to be used after the
   * word "until", e.g. "last service Sun 9th Mar" or "further notice".
   */
  abstract getDisplayString(options: DisplayStringOptions): string;

  /** The latest date this end condition could be interpreted as, if known. */
  abstract getLatestInterpretableDate(): Date | null;
}
