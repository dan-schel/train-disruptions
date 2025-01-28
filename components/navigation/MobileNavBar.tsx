import React from "react";
import { getNavTabs } from "./utils";
import { Row } from "../core/Row";
import { MobileTabButton } from "./MobileTabButton";

export const MobileNavBar = () => {
  const routes = getNavTabs({ includeAdmin: true, includeSettings: true });

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden">
      <Row justify="center">
        {routes.map((route) => (
          <MobileTabButton key={route.name} tab={route} />
        ))}
      </Row>
    </nav>
  );
};
