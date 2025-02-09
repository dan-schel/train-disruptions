import { z } from "zod";
import { DatabaseModel } from "../lib/general/database-model";
import { Disruption } from "../../data/disruption";
import { StationClosureDisruptionData } from "../../data/disruptions/station-closure";
import { disruptionPeriodBson } from "../../data/disruptions/period/disruption-period";

export class DisruptionModel extends DatabaseModel<
  Disruption,
  string,
  z.input<typeof DisruptionModel.schema>
> {
  static instance = new DisruptionModel();

  private static schema = z.object({
    // TODO: Becomes:
    // ```
    // data: z.union([
    //   StationClosureDisruptionData.bson,
    //   NoCityLoopDisruptionData.bson,
    //   BusReplacementsDisruptionData.bson,
    //   etc.
    // ])
    // ```
    // as more types are added.
    data: StationClosureDisruptionData.bson,
    sourceAlertIds: z.string().array(),
    period: disruptionPeriodBson,
  });

  private constructor() {
    super("alerts");
  }

  getId(item: Disruption): string {
    return item.id;
  }

  serialize(item: Disruption): z.input<typeof DisruptionModel.schema> {
    return {
      data: item.data.toBson(),
      sourceAlertIds: item.sourceAlertIds,
      period: item.period.toBson(),
      // TODO: There's probably other (computed) fields we could add to make
      // queries more efficient, e.g. the date range, or the affected lines.
    };
  }

  deserialize(id: string, item: unknown): Disruption {
    const parsed = DisruptionModel.schema.parse(item);
    return new Disruption(
      id,
      parsed.data,
      parsed.sourceAlertIds,
      parsed.period,
    );
  }
}
