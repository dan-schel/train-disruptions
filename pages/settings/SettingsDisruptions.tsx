import React from "react";

import { Column } from "../../components/core/Column";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";

export function SettingsDisruptions() {
  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Disruptions to Show
      </Text>
      <Spacer h="2" />

      <Column>
        <Row className="gap-2">
          <label htmlFor="station-check"> Essential disruption </label>
          <input type="checkbox" id="station-check" value="" checked disabled />
        </Row>

        <Row className="gap-2">
          <label htmlFor="cancel-check"> Station Closure </label>
          <input type="checkbox" id="cancel-check" value="" />
        </Row>

        <Row className="gap-2">
          <label htmlFor="delay-check"> Delays </label>
          <input type="checkbox" id="delay-check" value="" />
        </Row>

        <Row className="gap-2">
          <label htmlFor="parking-check"> Car Park Closures </label>
          <input type="checkbox" id="parking-check" value="" />
        </Row>

        <Row className="gap-2">
          <label htmlFor="parking-check"> Accessibility </label>
          <input type="checkbox" id="accessibility-check" value="" />
        </Row>
      </Column>
      <Spacer h="4" />
    </Column>
  );
}
