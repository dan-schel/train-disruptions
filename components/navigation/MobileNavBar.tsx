import React from "react";
import { MobileTabButton } from "@/components/navigation/MobileTabButton";
import { Grid } from "@/components/core/Grid";
import {
  NavBarOrchestrator,
  NavBarOrchestratorLayoutProps,
} from "@/components/navigation/NavBarOrchestrator";

export function MobileNavBar() {
  return <NavBarOrchestrator Layout={MobileNavBarLayout} />;
}

function MobileNavBarLayout(props: NavBarOrchestratorLayoutProps) {
  const { nonSettingsTabs, settingsTab, isActiveTab, onTabClick } = props;

  return (
    <nav className="bg-background border-t-soft-border fixed right-0 bottom-0 left-0 z-50 min-w-(--page-min-width) border-t md:hidden">
      <Grid className="auto-cols-[1fr] grid-flow-col px-4">
        {[...nonSettingsTabs, settingsTab].map((tab) => (
          <MobileTabButton
            key={tab.name}
            tab={tab}
            isActive={isActiveTab(tab)}
            onClick={() => onTabClick(tab)}
          />
        ))}
      </Grid>
    </nav>
  );
}
