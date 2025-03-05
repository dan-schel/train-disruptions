import React from "react";

import { Column } from "../../components/core/Column";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";

export function SettingsTheme() {
  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Colour Theme
      </Text>
      <Spacer h="2" />
      <Column>
        <Row className="gap-2">
          <input type="radio" id="theme-1" name="colour-theme" value="auto" />
          <label htmlFor="theme-1"> Auto </label>
        </Row>

        <Row className="gap-2">
          <input type="radio" id="theme-2" name="colour-theme" value="light" />
          <label htmlFor="theme-2"> Light </label>
        </Row>

        <Row className="gap-2">
          <input type="radio" id="theme-3" name="colour-theme" value="dark" />
          <label htmlFor="theme-3"> Dark </label>
        </Row>
      </Column>
      <Spacer h="4" />
    </Column>
  );
}
