import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { useData } from "vike-react/useData";
import { Data } from "./+data";

export default function Page() {
  // TODO: This is temporary. Saves me having to check the prod database all the
  // time though. If you're here to work on the Admin page, free free to move
  // all this to another place or delete it.
  const { historicalAlertsCount, historicalAlertsAvgPerDay } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column className="gap-4">
          <Text style="title">Admin</Text>
          <Text>
            {historicalAlertsCount}{" "}
            {historicalAlertsCount === 1
              ? "historical alert"
              : "historical alerts"}{" "}
            recorded so far.
          </Text>
          <Text>
            That&apos;s an average of {historicalAlertsAvgPerDay.toFixed(2)} per
            day.
          </Text>
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
