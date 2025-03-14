/** Manages all things related to time. Can be mocked for testing. */
export abstract class TimeProvider {
  abstract now(): Date;

  // TODO: Methods for scheduling tasks?
}

/** Returns the real time. */
export class RealTimeProvider extends TimeProvider {
  now(): Date {
    return new Date();
  }
}

/** Returns a given time. Useful for unit tests. */
export class FixedTimeProvider extends TimeProvider {
  constructor(private readonly _now: Date) {
    super();
  }

  now(): Date {
    return this._now;
  }
}
