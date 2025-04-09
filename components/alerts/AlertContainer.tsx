import React from "react";

import { Column } from "@/components/core/Column";
import { AlertPreview } from "@/shared/types/alert-data";
import { AlertListContainer } from "@/components/alerts/AlertListContainer";
import { AlertListPagination } from "@/components/alerts/AlertListPagination";

type AlertListContainerProps = {
  alerts: AlertPreview;
};

export function AlertContainer({ alerts }: AlertListContainerProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [alertsPerPage] = React.useState(10);

  const indexOfLastAlert = currentPage * alertsPerPage;
  const indexOfFirstAlert = indexOfLastAlert - alertsPerPage;
  const currentAlerts = alerts.slice(indexOfFirstAlert, indexOfLastAlert);

  return (
    <Column>
      <AlertListContainer alerts={currentAlerts} />
      <AlertListPagination
        alertsPerPage={alertsPerPage}
        totalAlerts={alerts.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </Column>
  );
}
