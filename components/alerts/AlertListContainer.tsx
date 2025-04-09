import React from "react";

import { Column } from "@/components/core/Column";

import { AlertButton } from "@/components/alerts/AlertButton";

type AlertData = {
  title: string;
  description: string;
  url: string;
  startsAt: Date | null;
  endsAt: Date | null;
  affectedLinePtvIds: number[];
  affectedStationPtvIds: number[];
};

type ContentTableProps = {
  data: {
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

export function AlertListContainer({ data }: ContentTableProps) {
  return (
    <>
      <Column>
        <Column className="gap-4">
          {data.map((alert) => (
            <AlertButton
              key={alert.id}
              // action={`/admin/alerts/${alert.id}`}
              action={""}
              title={alert.data.title}
              id={alert.id}
            />
          ))}
        </Column>
      </Column>
    </>
  );
}
