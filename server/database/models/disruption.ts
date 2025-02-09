import { z } from "zod";
import { DatabaseModel } from "../lib/general/database-model";
import { Disruption } from "../../data/disruption/disruption";
import { disruptionPeriodBson } from "../../data/disruption/period/disruption-period";
import { disruptionDataBson } from "../../data/disruption/data/disruption-data";

export class DisruptionModel extends DatabaseModel<
  Disruption,
  string,
  z.input<typeof DisruptionModel.schema>
> {
  static instance = new DisruptionModel();

  private static schema = z.object({
    data: disruptionDataBson,
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
