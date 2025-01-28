import React from "react";
import { PageCenterer } from "../common/PageCenterer";
import { Text } from "../core/Text";
import { getNavTabs, settings } from "./utils";
import { Grid } from "../core/Grid";
import { Row } from "../core/Row";
import { DesktopTabButton } from "./DesktopTabButton";

export const DesktopNavBar = () => {
  const routes = getNavTabs({ includeAdmin: true });

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 hidden border-b border-b-slate-200 bg-white md:block">
      <PageCenterer>
        <Grid
          columns="auto 1fr auto"
          align="center"
          className="gap-4 px-4 py-2"
        >
          <Text style="custom" className="text-xl" oneLine>
            Is it buses?
          </Text>
          <Row>
            {routes.map((route) => (
              <DesktopTabButton key={route.name} tab={route} />
            ))}
          </Row>
          <DesktopTabButton tab={settings} />
        </Grid>
      </PageCenterer>
    </nav>
  );
};
