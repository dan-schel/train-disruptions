import React from "react";

import { Column } from "../../components/core/Column";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";

export function SettingsHome() {
  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Start page
      </Text>
      <Spacer h="2" />

      <Column>
        <Row className="gap-2">
          <input
            type="radio"
            id="start-page-1"
            name="start-page"
            value="Overview"
          />
          <label htmlFor="start-page-1"> Overview </label>
        </Row>

        <Row className="gap-2">
          <input
            type="radio"
            id="start-page-2"
            name="start-page"
            value="Commute"
          />
          <label htmlFor="start-page-2"> My Commute </label>
        </Row>
      </Column>
      <Spacer h="4" />
    </Column>
  );
}
