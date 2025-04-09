import React from "react";

import { AlertPreview } from "@/shared/types/alert-data";

import { Column } from "@/components/core/Column";
import { AlertButton } from "@/components/alerts/AlertButton";

type AlertListContainerProps = {
  alerts: AlertPreview;
};

export function AlertListContainer({ alerts }: AlertListContainerProps) {
  return (
    <Column className="gap-4">
      {alerts.map((alert) => (
        <AlertButton
          key={alert.id}
          // action={`/admin/alerts/${alert.id}`}
          action={""}
          title={alert.title}
          id={alert.id}
        />
      ))}
    </Column>
  );
}
