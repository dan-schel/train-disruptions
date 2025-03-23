import React from "react";
import axios from "axios";
import { Data } from "@/pages/admin/+data";
import { reload } from "vike/client/router";
import { useData } from "vike-react/useData";

import { Text } from "@/components/core/Text";
import AdminButton from "@/pages/admin/Button";
import { Column } from "@/components/core/Column";
import { PagePadding } from "@/components/common/PagePadding";
import { PageCenterer } from "@/components/common/PageCenterer";
import { MingcuteExitFill } from "@/components/icons/MingcuteExitFill";
import { MingcuteUser4Fill } from "@/components/icons/MingcuteUser4Fill";
import { MingcuteGroup2Fill } from "@/components/icons/MingcuteGroup2Fill";

export default function Page() {
  // TODO: This is temporary. Saves me having to check the prod database all the
  // time though. If you're here to work on the Admin page, free free to move
  // all this to another place or delete it.
  const { historicalAlertsCount, historicalAlertsAvgPerDay, isSuperAdmin } =
    useData<Data>();

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

          <AdminButton
            action={"/admin/account"}
            icon={<MingcuteUser4Fill className="size-8" />}
            label="Account"
          />

          {isSuperAdmin && (
            <AdminButton
              action={"/admin/users"}
              icon={<MingcuteGroup2Fill className="size-8" />}
              label="Manage Users"
            />
          )}

          <AdminButton
            action={handleLogout}
            icon={<MingcuteExitFill className="size-8" />}
            label="Logout"
          />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
