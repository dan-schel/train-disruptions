import { z } from "zod";
import { DatabaseModel } from "@dan-schel/db";
import { Disruption } from "@/server/data/disruption/disruption";
import { disruptionPeriodBson } from "@/server/data/disruption/period/disruption-period";
import { disruptionDataBson } from "@/server/data/disruption/data/disruption-data";

const beginningOfTime = new Date("2000-01-01T00:00:00Z");
const endOfTime = new Date("2100-01-01T00:00:00Z");

export class DisruptionModel extends DatabaseModel<
  Disruption,
  string,
  z.input<typeof DisruptionModel.schema>
> {
  static instance = new DisruptionModel();

  private static schema = z.object({
    data: disruptionDataBson,
    period: disruptionPeriodBson,
    curation: z.enum(["automatic", "manual"]).default("manual"),
    alertId: z.string().nullable().optional(),

    // For backwards compatibility (next PR will include data migration).
    sourceAlertIds: z.string().array().optional(),

    // Computed fields - included for ease of querying.
    earliestImpactedDate: z.date(),
    latestImpactedDate: z.date(),
  });

  private constructor() {
    super("disruptions");
  }

  getId(item: Disruption): string {
    return item.id;
  }

  serialize(item: Disruption): z.input<typeof DisruptionModel.schema> {
    const { start, end } = this._getFullyEncompassingTimeRange(item);

    return {
      data: item.data.toBson(),
      period: item.period.toBson(),
      curation: item.curation,
      alertId: item.alertId,

      earliestImpactedDate: start,
      latestImpactedDate: end,
    };
  }

  deserialize(id: string, item: unknown): Disruption {
    const parsed = DisruptionModel.schema.parse(item);

    // For backwards compatibility (next PR will include data migration).
    const alertId = parsed.alertId ?? parsed.sourceAlertIds?.[0] ?? null;

    return new Disruption(
      id,
      parsed.data,
      parsed.period,
      parsed.curation,
      alertId,
    );
  }

  private _getFullyEncompassingTimeRange(item: Disruption) {
    const timeRange = item.period.getFullyEncompassingTimeRange();

    // Instead of null, use arbitrary dates far in the future/past so we can
    // easily do date comparisons when querying the database.
    return {
      start: timeRange.start ?? beginningOfTime,
      end: timeRange.end ?? endOfTime,
    };
  }
}
