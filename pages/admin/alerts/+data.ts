import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";
import { AlertPreview } from "@/shared/types/alert-data";
import { AlertSource } from "@/server/database-source/alert-source";

export type Data = {
  alerts: AlertPreview;
};

export async function data(
  pageContext: PageContext,
): Promise<Data & JsonSerializable> {
  const { app } = pageContext.custom;

  const alerts = await AlertSource.getInstance(app).listAlerts({
    state: ["new"],
  });

  return {
    alerts: alerts.map((alert) => ({
      id: alert.id,
      title: alert.data.title,
    })),
  };
}
