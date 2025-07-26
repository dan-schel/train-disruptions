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

  // Don't use a CSS var for `env(safe-area-inset-bottom, 0px)` because Chrome's
  // code optimization for smooth animation doesn't seem to work unless it's
  // hardcoded. (https://developer.chrome.com/docs/css-ui/edge-to-edge)
  return (
    <nav className="bg-background border-t-soft-border fixed right-0 bottom-[calc(env(safe-area-inset-bottom,_0px)_-_var(--max-chin-size))] left-0 z-50 min-w-(--page-min-width) border-t pb-(--max-chin-size) md:hidden">
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
