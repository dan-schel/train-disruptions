export type DisplayStringOptions = {
  now: Date;
};

/** Defines how/when the disruption ends. */
export abstract class EndsBase {
  abstract getDisplayString(options: DisplayStringOptions): string;

  abstract latestInterpretableDate(): Date | null;
}
