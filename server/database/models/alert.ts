import { z } from "zod";
import { Alert, AlertData } from "../../data/alert";
import { DatabaseModel } from "../lib/general/database-model";

export class AlertModel extends DatabaseModel<
  Alert,
  string,
  z.input<typeof AlertModel.schema>
> {
  static instance = new AlertModel();

  private static schema = z.object({
    state: z.enum(["new", "processed", "ignored", "updated"]),
    data: AlertData.bson,
    updatedData: AlertData.bson.nullable(),
    appearedAt: z.date(),
    processedAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
    ignoreFutureUpdates: z.boolean(),
    deleteAt: z.date().nullable(),
  });

  private constructor() {
    super("alerts");
  }

  getId(item: Alert): string {
    return item.id;
  }

  serialize(item: Alert): z.input<typeof AlertModel.schema> {
    return {
      state: item.state,
      data: item.data.toBson(),
      updatedData: item.updatedData?.toBson() ?? null,
      appearedAt: item.appearedAt,
      processedAt: item.processedAt,
      updatedAt: item.updatedAt,
      ignoreFutureUpdates: item.ignoreFutureUpdates,
      deleteAt: item.deleteAt,
    };
  }

  deserialize(id: string, item: unknown): Alert {
    const parsed = AlertModel.schema.parse(item);
    return new Alert(
      id,
      parsed.state,
      parsed.data,
      parsed.updatedData,
      parsed.appearedAt,
      parsed.processedAt,
      parsed.updatedAt,
      parsed.ignoreFutureUpdates,
      parsed.deleteAt,
    );
  }
}
