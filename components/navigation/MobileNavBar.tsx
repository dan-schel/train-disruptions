import React from "react";
import { admin, myCommute, overview, settings } from "./utils";
import { MobileTabButton } from "./MobileTabButton";
import { Grid } from "../core/Grid";

export const MobileNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-t-slate-200 bg-white md:hidden">
      <Grid className="auto-cols-[1fr] grid-flow-col px-4">
        {[overview, myCommute, admin, settings].map((route) => (
          <MobileTabButton key={route.name} tab={route} />
        ))}
      </Grid>
    </nav>
  );
};
