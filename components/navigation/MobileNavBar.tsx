import React from "react";
import {
  admin,
  myCommute,
  overview,
  settings,
} from "@/components/navigation/utils";
import { MobileTabButton } from "@/components/navigation/MobileTabButton";
import { Grid } from "@/components/core/Grid";

export function MobileNavBar() {
  return (
    <nav className="fixed right-0 bottom-0 left-0 z-50 min-w-(--page-min-width) border-t border-t-slate-200 bg-white md:hidden">
      <Grid className="auto-cols-[1fr] grid-flow-col px-4">
        {[overview, myCommute, admin, settings].map((route) => (
          <MobileTabButton key={route.name} tab={route} />
        ))}
      </Grid>
    </nav>
  );
}
