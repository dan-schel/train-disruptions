import React from "react";

import { AlertPreview } from "@/shared/types/alert-data";

import { Column } from "@/components/core/Column";
import { AlertButton } from "@/components/alerts/AlertButton";

type AlertListContainerProps = {
  alerts: AlertPreview;
  from?: string;
};

export function AlertListContainer({ alerts, from }: AlertListContainerProps) {
  return (
    <Column className="gap-4">
      {alerts.map((alert) => (
        <AlertButton
          key={alert.id}
          action={`/admin/alerts/${alert.id}${from ? "?disruption=" + from : ""}`}
          title={alert.title}
          id={alert.id}
        />
      ))}
    </Column>
  );
}
