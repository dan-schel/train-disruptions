import { App } from "@/server/app";
import { Disruption } from "@/server/data/disruption/disruption";
import { TimeRange } from "@/server/data/disruption/period/utils/time-range";
import { LineStatusIndicatorPriority } from "@/server/data/disruption/writeup/disruption-writeup";
import { DisruptionModel } from "@/server/database/models/disruption";
import { DISRUPTIONS } from "@/server/database/models/models";
import { DisruptionType } from "@/shared/types/disruption";
import { Repository } from "@dan-schel/db";

type ListDisruptionFilter = {
  lines?: number[];
  types?: DisruptionType[];
  period?: TimeRange | Date;
  priority?: LineStatusIndicatorPriority[];
  valid?: boolean;
};

type GetDisruptionFilter = {
  id: Disruption["id"];
  valid?: boolean;
};

export class DisruptionSource {
  private static instance: DisruptionSource;
  private database: Repository<DisruptionModel>;

  private constructor(private app: App) {
    this.database = app.database.of(DISRUPTIONS);
  }

  static getInstance(app: App): DisruptionSource {
    if (!this.instance) {
      this.instance = new DisruptionSource(app);
    }

    return this.instance;
  }

  async listDisruptions({
    lines,
    types,
    period,
    priority,
    valid,
  }: ListDisruptionFilter) {
    return (await this.database.all())
      .filter(this._filterByAffectedLines(lines))
      .filter(this._filterByDisruptionType(types))
      .filter(this._filterByPeriod(period))
      .filter(this._filterByPriority(priority))
      .filter(this._filterByValidity(valid));
  }

  async getDisruption({ id, valid }: GetDisruptionFilter) {
    const disruption = await this.database.get(id);

    if (valid === undefined || !disruption) return disruption ?? null;

    return this._filterByValidity(valid)(disruption) ? disruption : null;
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

  private _filterByDisruptionType(type: ListDisruptionFilter["types"]) {
    return function (disruption: Disruption) {
      if (!type) return true;
      return type.includes(disruption.data.toBson().type);
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
}
