import React from "react";

import { Column } from "../../components/core/Column";
import { DisruptionButton } from "./DisruptionButton";

export function Disruptions() {
  return (
    <Column className="divide-y-1 divide-slate-200">
      <DisruptionButton
        type="buses"
        duration="Until further notice"
        id={1}
        title="Caulfield to Westall"
        colour="#16b4e8"
      />
      <DisruptionButton
        type="major delays"
        colour="#6c3b9f"
        id={2}
        lineName="Sandringham"
      />
      <DisruptionButton
        type="station closure"
        Station="Glenferrie"
        duration="Until last train on Sunday"
        id={3}
      />
    </Column>
  );
}
