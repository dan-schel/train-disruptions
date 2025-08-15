import { z } from "zod";
import { Alert, AlertState, alertStates } from "@/server/data/alert/alert";
import { DatabaseModel } from "@dan-schel/db";
import { AlertData } from "@/server/data/alert/alert-data";

const backwardsCompatibleStates = [
  ...alertStates,
  "processed",
  "ignored",
  "updated",
] as const;
type BackwardsCompatibleState = (typeof backwardsCompatibleStates)[number];

export class AlertModel extends DatabaseModel<
  Alert,
  string,
  z.input<typeof AlertModel.schema>
> {
  static instance = new AlertModel();

  private static schema = z.object({
    state: z.enum(backwardsCompatibleStates),
    data: AlertData.bson,
    updatedData: AlertData.bson.nullable(),
    appearedAt: z.date(),
    processedAt: z.date().nullable(),
    updatedAt: z.date().nullable(),
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
      deleteAt: item.deleteAt,
    };
  }

  deserialize(id: string, item: unknown): Alert {
    const parsed = AlertModel.schema.parse(item);

    const mapping: Record<BackwardsCompatibleState, AlertState> = {
      new: "new",
      "processed-provisionally": "processed-provisionally",
      "processed-automatically": "processed-automatically",
      "processed-manually": "processed-manually",
      "updated-since-manual-processing": "updated-since-manual-processing",
      "ignored-automatically": "ignored-automatically",
      "ignored-manually": "ignored-manually",
      "ignored-permanently": "ignored-permanently",

      // Backwards compatibility mappings:
      updated: "updated-since-manual-processing",
      processed: "processed-manually", // Not a perfect mapping, but it's fine.
      ignored: "ignored-permanently",
    };

    return new Alert(
      id,
      mapping[parsed.state],
      parsed.data,
      parsed.updatedData,
      parsed.appearedAt,
      parsed.processedAt,
      parsed.updatedAt,
      parsed.deleteAt,
    );
  }
}
