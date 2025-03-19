import React from "react";

import { Text } from "@/components/core/Text";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { useData } from "vike-react/useData";
import { Data } from "@/pages/admin/+data";
import axios from "axios";
import { reload } from "vike/client/router";
import { SimpleButton } from "@/components/common/SimpleButton";

export default function Page() {
  // TODO: This is temporary. Saves me having to check the prod database all the
  // time though. If you're here to work on the Admin page, free free to move
  // all this to another place or delete it.
  const { historicalAlertsCount, historicalAlertsAvgPerDay } = useData<Data>();

  async function handleLogout() {
    try {
      await axios.get("/api/auth/logout", { withCredentials: true });
      await reload();
    } catch (error) {
      console.warn(error);
    }
  }

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

          <SimpleButton text="Log out" onClick={handleLogout} />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
