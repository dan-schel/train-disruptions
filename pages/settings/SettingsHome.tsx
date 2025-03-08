import React from "react";

import { Column } from "../../components/core/Column";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";
import { CommuteData } from "./+data";

export type HomepageProps = {
  data: CommuteData;
};

export function SettingsHome(props: HomepageProps) {
  const commuteSettings = props.data;

  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Start page
      </Text>
      <Spacer h="2" />

      <Column>
        {commuteSettings === null ? (
          // No data, default to Overview
          <>
            <Row className="gap-2">
              <input
                type="radio"
                id="start-page-1"
                name="start-page"
                value="overview"
                defaultChecked
              />
              <label htmlFor="start-page-1"> Overview </label>
            </Row>

            <Row className="gap-2">
              <input
                type="radio"
                id="start-page-2"
                name="start-page"
                value="commute"
              />
              <label htmlFor="start-page-2"> My Commute </label>
            </Row>
          </>
        ) : (
          // Not null
          <>
            <Row className="gap-2">
              <input
                type="radio"
                id="start-page-1"
                name="start-page"
                value="overview"
              />
              <label htmlFor="start-page-1"> Overview </label>
            </Row>

            <Row className="gap-2">
              <input
                type="radio"
                id="start-page-2"
                name="start-page"
                value="commute"
                defaultChecked
              />
              <label htmlFor="start-page-2"> My Commute </label>
            </Row>
          </>
        )}
      </Column>
      <Spacer h="4" />
    </Column>
  );
}
