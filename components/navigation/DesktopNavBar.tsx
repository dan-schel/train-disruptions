import React from "react";
import { PageCenterer } from "@/components/common/PageCenterer";
import { Text } from "@/components/core/Text";
import { Grid } from "@/components/core/Grid";
import { Row } from "@/components/core/Row";
import { DesktopTabButton } from "@/components/navigation/DesktopTabButton";
import { Favicon } from "@/components/icons/Favicon";
import { Button } from "@/components/core/Button";
import {
  NavBarOrchestrator,
  NavBarOrchestratorLayoutProps,
} from "@/components/navigation/NavBarOrchestrator";

export function DesktopNavBar() {
  return <NavBarOrchestrator Layout={DesktopNavBarLayout} />;
}

function DesktopNavBarLayout(props: NavBarOrchestratorLayoutProps) {
  const { nonSettingsTabs, settingsTab, isActiveTab, onTabClick } = props;

  return (
    <nav className="bg-background border-b-soft-border fixed top-0 right-0 left-0 z-50 hidden border-b md:block">
      <PageCenterer>
        <Grid columns="auto 1fr auto" className="gap-8 px-6">
          <Button href="/">
            <Row align="center" className="gap-2">
              <Favicon />
              <Text style="subtitle" oneLine>
                Is it buses?
              </Text>
            </Row>
          </Button>
          <Row className="gap-8">
            {nonSettingsTabs.map((tab) => (
              <DesktopTabButton
                key={tab.name}
                tab={tab}
                isActive={isActiveTab(tab)}
                onClick={() => onTabClick(tab)}
              />
            ))}
          </Row>
          <DesktopTabButton
            tab={settingsTab}
            isActive={isActiveTab(settingsTab)}
            onClick={() => onTabClick(settingsTab)}
          />
        </Grid>
      </PageCenterer>
    </nav>
  );
}
