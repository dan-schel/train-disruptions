import { PageContext } from "vike/types";
import { UNPROCESSED_ALERTS } from "@/server/database/models/models";
import { JsonSerializable } from "@/shared/json-serializable";

export type Data = {
  unprocessedAlertCount: number;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;

  const unprocessedAlertCount = await app.database
    .of(UNPROCESSED_ALERTS)
    .count({ where: { processedAt: null } });

  return {
    unprocessedAlertCount,
  };
}
