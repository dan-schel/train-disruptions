import React from "react";
import { PageCenterer } from "@/components/common/PageCenterer";
import { Text } from "@/components/core/Text";
import {
  admin,
  myCommute,
  overview,
  settings,
} from "@/components/navigation/utils";
import { Grid } from "@/components/core/Grid";
import { Row } from "@/components/core/Row";
import { DesktopTabButton } from "@/components/navigation/DesktopTabButton";
import { Favicon } from "@/components/icons/Favicon";
import { Button } from "@/components/core/Button";
import { useSettings } from "@/hooks/useSettings";

export function DesktopNavBar() {
  const [userSettings] = useSettings();

  const leftAlignedTabs = userSettings.showAdminTab
    ? [overview, myCommute, admin]
    : [overview, myCommute];

  return (
    <nav className="bg-background border-b-soft-border fixed top-0 right-0 left-0 z-50 hidden border-b md:block">
      <PageCenterer>
        <Grid columns="auto 1fr auto" className="gap-4 px-4">
          <Button href="/">
            <Row align="center" className="gap-2 px-2">
              <Favicon />
              <Text
                style="custom"
                className="text-foreground-strong text-xl"
                oneLine
              >
                Is it buses?
              </Text>
            </Row>
          </Button>
          <Row>
            {leftAlignedTabs.map((route) => (
              <DesktopTabButton key={route.name} tab={route} />
            ))}
          </Row>
          <DesktopTabButton tab={settings} />
        </Grid>
      </PageCenterer>
    </nav>
  );
}
