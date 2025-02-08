export abstract class DisruptionPeriod {}

export class StandardDisruptionPeriod extends DisruptionPeriod {
  constructor(
    public start: Date | null,
    public end: EndTime,
  ) {
    super();
  }
}
export class EveningsOnlyDisruptionPeriod extends DisruptionPeriod {
  constructor(
    public start: Date | null,
    public end: EndTime,
    public startHourEachDay: number,
  ) {
    super();
  }
}

// TODO: Not a huge fan of the class names below, but if they were methods I'd
// go for something like:
// - ends.never()
// - ends.exactly(timestamp)
// - ends.afterLastService(date)
// - ends.whenAlertEnds(alertId)
// - ends.approximately(text, earliestInterpretation, latestInterpretation)

/** Defines how/when the disruption ends. */
export abstract class EndTime {}

/** The disruption never ends. */
export class Indefinite extends EndTime {}

/** The disruption ends after an exact timestamp. */
export class ExactEndTime extends EndTime {
  constructor(public date: Date) {
    super();
  }
}

/** The disruption ends when the source alert ends. */
export class AlertLinkedEndTime extends EndTime {
  constructor(
    /** The alert ID to track. */
    public alertId: string,
  ) {
    super();
  }
}

/** The disruption ends after the last service on a given date. */
export class AfterLastService extends EndTime {
  constructor(
    /** The timetable date, e.g. Sun 9 Feb is translated to 3am, Mon 10 Feb. */
    public date: Date,
  ) {
    super();
  }
}

/** The disruption ends on a roughly given time. */
export class ApproximateEndTime extends EndTime {
  constructor(
    /** E.g. "late March" or "Spring 2025". */
    public displayText: string,
    /** The earliest reasonable date/time which it could be interpreted as. */
    public earliest: Date,
    /** The latest reasonable date/time which it could be interpreted as. */
    public latest: Date,
  ) {
    super();
  }
}
