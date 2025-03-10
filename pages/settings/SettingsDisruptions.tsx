import React from "react";

// import { useState } from "react";
import { Column } from "../../components/core/Column";
import { Row } from "../../components/core/Row";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";
import { FilterableDisruptionCategory, Settings } from "../../shared/settings";

export type DisruptionSettingsProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export function SettingsDisruptions(props: DisruptionSettingsProps) {
  // const [categories] = useState(props.data);
  // disruptionSettings = props.data;
  // console.log("props.data: " + props.data);
  // console.log("props.data.hiddenCatagories: " + props.data.hiddenCategories);

  function toggleHiddenCategory(category: FilterableDisruptionCategory) {
    if (props.settings.hiddenCategories.includes(category)) {
      props.setSettings(props.settings.withoutHiddenCategory(category));
    } else {
      props.setSettings(props.settings.withHiddenCategory(category));
    }
  }

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
          {props.settings.hiddenCategories.includes("station-closure") ? (
            <>
              <input
                type="checkbox"
                id="station-check"
                value="station-closure"
                name="stationupdate"
                defaultChecked
              />
            </>
          ) : (
            <>
              <input
                type="checkbox"
                id="station-check"
                value="station-closure"
                name="stationupdate"
              />
            </>
          )}
        </Row>

        <Row>
          <label htmlFor="cancel-check"> Cancellations </label>
          {props.settings.hiddenCategories.includes("cancellations") ? (
            <>
              <input
                type="checkbox"
                id="cancel-check"
                value="cancellations"
                name="cancellations"
                defaultChecked
              />
            </>
          ) : (
            <>
              <input
                type="checkbox"
                id="cancel-check"
                value="cancellations"
                name="cancellations"
              />
            </>
          )}
        </Row>

        <Row>
          <label htmlFor="delay-check"> Delays </label>
          {props.settings.hiddenCategories.includes("delays") ? (
            <>
              <input
                type="checkbox"
                id="delay-check"
                value="delays"
                name="delays"
                defaultChecked
                onChange={() => toggleHiddenCategory("delays")}
              />
            </>
          ) : (
            <>
              <input
                type="checkbox"
                id="delay-check"
                value="delays"
                name="delays"
                onChange={() => toggleHiddenCategory("delays")}
              />
            </>
          )}
        </Row>

        <Row>
          <label htmlFor="parking-check"> Car Park Closures </label>
          {props.settings.hiddenCategories.includes("car-park-closures") ? (
            <>
              <input
                type="checkbox"
                id="parking-check"
                value="car-park-closures"
                name="parkingupdate"
                defaultChecked
              />
            </>
          ) : (
            <>
              <input
                type="checkbox"
                id="parking-check"
                value="car-park-closures"
                name="parkingupdate"
              />
            </>
          )}
        </Row>

        <Row>
          <Column>
            <label htmlFor="accessibility-check"> Accessibility </label>
            <Text style="custom" className="text-sm">
              {" "}
              Lift outages, stair only, etc.{" "}
            </Text>
          </Column>
          {props.settings.hiddenCategories.includes("accessibility") ? (
            <>
              <input
                type="checkbox"
                id="accessibility-check"
                value="accessibility"
                name="accessibility"
                defaultChecked
              />
            </>
          ) : (
            <>
              <input
                type="checkbox"
                id="accessibility-check"
                value="accessibility"
                name="accessibility"
              />
            </>
          )}
        </Row>
      </Column>
      <Spacer h="4" />
    </Column>
  );
}
