import { PageContext } from "vike/types";
import { ALERTS } from "@/server/database/models/models";
import { JsonSerializable } from "@/shared/json-serializable";
import { AlertPreview } from "@/shared/types/alert-data";

export type Data = {
  alerts: AlertPreview;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;

  const alerts = await app.database
    .of(ALERTS)
    .find({ where: { processedAt: null } });

  return {
    alerts: alerts.map((alert) => ({
      id: alert.id,
      title: alert.data.title,
    })),
  };
}
