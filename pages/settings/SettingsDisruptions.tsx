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

      <Column className="gap-2">
        <Row>
          <Column>
            <label htmlFor="essential-check"> Essential disruption </label>
            <Text style="custom" className="text-sm">
              {" "}
              Buses replace trains, line closures{" "}
            </Text>
          </Column>
          <input
            type="checkbox"
            id="essential-check"
            value="essential"
            checked
            disabled
          />
        </Row>

        <Row>
          <label htmlFor="station-check"> Station Closure </label>
          <input
            type="checkbox"
            id="station-check"
            value="station-closure"
            name="stationupdate"
          />
        </Row>

        <Row>
          <label htmlFor="cancel-check"> Cancellations </label>
          <input
            type="checkbox"
            id="cancel-check"
            value="cancellations"
            name="cancellations"
          />
        </Row>

        <Row>
          <label htmlFor="delay-check"> Delays </label>
          <input
            type="checkbox"
            id="delay-check"
            value="delays"
            name="delays"
          />
        </Row>

        <Row>
          <label htmlFor="parking-check"> Car Park Closures </label>
          <input
            type="checkbox"
            id="parking-check"
            value="car-park-closures"
            name="parkingupdate"
          />
        </Row>

        <Row>
          <Column>
            <label htmlFor="accessibility-check"> Accessibility </label>
            <Text style="custom" className="text-sm">
              {" "}
              Lift outages, stair only, etc.{" "}
            </Text>
          </Column>
          <input
            type="checkbox"
            id="accessibility-check"
            value="accessibility"
            name="accessibility"
          />
        </Row>
      </Column>
      <Spacer h="4" />
    </Column>
  );
}
