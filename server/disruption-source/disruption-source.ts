import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";
import { LineStatusIndicatorPriority } from "@/server/data/disruption/writeup/disruption-writeup";
import { DISRUPTIONS } from "@/server/database/models/models";
import { NonEmptyArray } from "@/shared/types/non-empty-array";
import { differenceInMilliseconds } from "date-fns";
import { millisecondsInMinute } from "date-fns/constants";

type ListDisruptionFilter = {
  valid?: boolean;
  priority?: NonEmptyArray<LineStatusIndicatorPriority>;
  lines?: NonEmptyArray<number>;
  period?: TimeRange | Date;
};

type GetDisruptionFilter = {
  id: Disruption["id"];
  valid?: boolean;
};

export class DisruptionSource {
  private static instance: DisruptionSource;
  static readonly STALE_TIMER = millisecondsInMinute;
  private lastQueried: Date;

  // Caching the database results to prevent excessive database calls
  private disruptions: Disruption[] = [];

  private constructor(private app: App) {
    this.lastQueried = new Date(0);
  }

  static getInstance(app: App): DisruptionSource {
    if (!this.instance) {
      this.instance = new DisruptionSource(app);
    }

    return this.instance;
  }

  private async _retrieveDisruptions() {
    if (this._isDataStale()) {
      this.disruptions = await this.app.database.of(DISRUPTIONS).all();
    }
  }

  async listDisruptions({
    lines,
    period,
    priority,
    valid,
  }: ListDisruptionFilter) {
    await this._retrieveDisruptions();

    return this.disruptions
      .filter(this._filterByAffectedLines(lines))
      .filter(this._filterByPeriod(period))
      .filter(this._filterByPriority(priority))
      .filter(this._filterByValidity(valid));
  }

  async getDisruption({ id, valid }: GetDisruptionFilter) {
    await this._retrieveDisruptions();

    return (
      this.disruptions.find(
        (d) => d.id === id && this._filterByValidity(valid)(d),
      ) ?? null
    );
  }

  private _filterByAffectedLines(lines: ListDisruptionFilter["lines"]) {
    const app = this.app;
    return function (disruption: Disruption) {
      if (!lines) return true;
      return (
        new Set(disruption.data.getImpactedLines(app)).intersection(
          new Set(lines),
        ).size > 0
      );
    };
  }

  private _filterByPeriod(period: ListDisruptionFilter["period"]) {
    return function (disruption: Disruption) {
      if (!period) return true;
      return period instanceof Date
        ? disruption.period.occursAt(period)
        : disruption.period.intersects(period);
    };
  }

  private _filterByPriority(priority: ListDisruptionFilter["priority"]) {
    const app = this.app;
    return function (disruption: Disruption) {
      if (!priority) return true;
      return priority.includes(
        disruption.data.getWriteupAuthor().write(app, disruption)
          .lineStatusIndicator.priority,
      );
    };
  }

  private _filterByValidity(valid: ListDisruptionFilter["valid"]) {
    const app = this.app;
    return function (disruption: Disruption) {
      if (valid === undefined) return true;
      return valid
        ? disruption.data.validate(app)
        : !disruption.data.validate(app);
    };
  }

  private _isDataStale() {
    return (
      differenceInMilliseconds(this.app.time.now(), this.lastQueried) >=
      DisruptionSource.STALE_TIMER
    );
  }
}
