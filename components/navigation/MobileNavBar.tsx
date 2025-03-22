import React from "react";
import {
  admin,
  myCommute,
  overview,
  settings,
} from "@/components/navigation/utils";
import { MobileTabButton } from "@/components/navigation/MobileTabButton";
import { Grid } from "@/components/core/Grid";
import { useSettings } from "@/components/SettingsProvider";

export function MobileNavBar() {
  const [userSettings] = useSettings();

  const tabs = userSettings.showAdminTab
    ? [overview, myCommute, admin, settings]
    : [overview, myCommute, settings];

  return (
    <nav className="bg-surface border-t-action-secondary fixed right-0 bottom-0 left-0 z-50 min-w-(--page-min-width) border-t md:hidden">
      <Grid className="auto-cols-[1fr] grid-flow-col px-4">
        {tabs.map((route) => (
          <MobileTabButton key={route.name} tab={route} />
        ))}
      </Grid>
    </nav>
  );
}
