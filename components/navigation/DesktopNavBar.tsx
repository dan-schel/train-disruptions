import React from "react";
import { PageCenterer } from "../common/PageCenterer";
import { Text } from "../core/Text";
import { admin, myCommute, overview, settings } from "./utils";
import { Grid } from "../core/Grid";
import { Row } from "../core/Row";
import { DesktopTabButton } from "./DesktopTabButton";
import { Favicon } from "../icons/Favicon";
import { Button } from "../core/Button";

export function DesktopNavBar() {
  return (
    <nav className="fixed top-0 right-0 left-0 z-50 hidden border-b border-b-slate-200 bg-white md:block">
      <PageCenterer>
        <Grid columns="auto 1fr auto" className="gap-4 px-4">
          <Button href="/">
            <Row align="center" className="gap-2 px-2">
              <Favicon />
              <Text style="custom" className="text-xl" oneLine>
                Is it buses?
              </Text>
            </Row>
          </Button>
          <Row>
            {[overview, myCommute, admin].map((route) => (
              <DesktopTabButton key={route.name} tab={route} />
            ))}
          </Row>
          <DesktopTabButton tab={settings} />
        </Grid>
      </PageCenterer>
    </nav>
  );
}
