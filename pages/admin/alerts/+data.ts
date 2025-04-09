import { PageContext } from "vike/types";
import { ALERTS } from "@/server/database/models/models";
import { JsonSerializable } from "@/shared/json-serializable";

type AlertData = {
  title: string;
  description: string;
  url: string;
  startsAt: Date | null;
  endsAt: Date | null;
  affectedLinePtvIds: number[];
  affectedStationPtvIds: number[];
};

export type Data = {
  alerts: {
    id: string;
    data: AlertData;
    // updatedData: AlertData | null;
    appearedAt: Date;
    processedAt: Date | null;
    updatedAt: Date | null;
    ignoreFutureUpdates: boolean;
    deleteAt: Date | null;
  }[];
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
      data: {
        title: alert.data.title,
        description: alert.data.description,
        url: alert.data.url,
        startsAt: alert.data.startsAt,
        endsAt: alert.data.endsAt,
        affectedLinePtvIds: alert.data.affectedLinePtvIds,
        affectedStationPtvIds: alert.data.affectedStationPtvIds,
      },
      // updatedData: alert.updatedData,
      appearedAt: alert.appearedAt,
      processedAt: alert.processedAt,
      updatedAt: alert.updatedAt,
      ignoreFutureUpdates: alert.ignoreFutureUpdates,
      deleteAt: alert.deleteAt,
    })),
  };
}
