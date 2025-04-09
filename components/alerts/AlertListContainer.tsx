import React from "react";

import { Alert } from "@/shared/types/alert-data";

import { Column } from "@/components/core/Column";
import { AlertButton } from "@/components/alerts/AlertButton";

type AlertListContainerProps = {
  alerts: Alert;
};

export function AlertListContainer({ alerts }: AlertListContainerProps) {
  return (
    <Column className="gap-4">
      {alerts.map((alert) => (
        <AlertButton
          key={alert.id}
          // action={`/admin/alerts/${alert.id}`}
          action={""}
          title={alert.data.title}
          id={alert.id}
        />
      ))}
    </Column>
  );
}
