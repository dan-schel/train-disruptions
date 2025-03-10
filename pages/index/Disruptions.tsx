import React from "react";

import { Column } from "../../components/core/Column";
import { DisruptionButton } from "./DisruptionButton";

export function Disruptions() {
  return (
    <Column className="divide-action-secondary divide-y-1">
      <DisruptionButton
        type="buses"
        duration="Until further notice"
        id={1}
        title="Caulfield to Westall"
        colour="#16b4e8"
      />
      <DisruptionButton
        type="major delays"
        colour="#fc7fbb"
        id={2}
        lineName="Sandringham"
      />
      <DisruptionButton
        type="station closure"
        station="Glenferrie"
        duration="Until last train on Sunday"
        id={3}
      />
      <DisruptionButton
        type="altered-route"
        alteration="Trains terminate and originate at Southern Cross"
        lineName="Sunbury"
        color="#6c3b9f"
        duration="Evenings until last train on Wednesday"
        id={4}
      />
    </Column>
  );
}
