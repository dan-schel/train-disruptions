import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { Spacer } from "../../components/core/Spacer";
// import { useSettings } from "../../hooks/useSettings";

export default function Page() {
  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="title">Settings</Text>
          <Spacer h="6" />

          <Text style="custom" className="text-lg font-bold">
            Start page
          </Text>
          <Column align="left">
            <div className="flex gap-2">
              <input
                type="radio"
                id="start-page-1"
                name="start-page"
                value="Overview"
              />
              <label htmlFor="start-page-1"> Overview </label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="start-page-2"
                name="start-page"
                value="Commute"
              />
              <label htmlFor="start-page-2"> My Commute </label>
            </div>
          </Column>

          <Spacer h="4" />

          <Text style="custom" className="text-lg font-bold">
            Disruptions to Show
          </Text>
          <Column align="left">
            <div className="flex gap-3">
              <label htmlFor="station-check"> Essential disruption </label>
              <input
                type="checkbox"
                id="station-check"
                value=""
                checked
                disabled
              />
            </div>

            <div className="flex gap-3">
              <label htmlFor="cancel-check"> Station Closure </label>
              <input type="checkbox" id="cancel-check" value="" />
            </div>

            <div className="flex gap-3">
              <label htmlFor="delay-check"> Delays </label>
              <input type="checkbox" id="delay-check" value="" />
            </div>

            <div className="flex gap-3">
              <label htmlFor="parking-check"> Car Park Closures </label>
              <input type="checkbox" id="parking-check" value="" />
            </div>

            <div className="flex gap-3">
              <label htmlFor="parking-check"> Accessibility </label>
              <input type="checkbox" id="accessibility-check" value="" />
            </div>
          </Column>

          <Spacer h="4" />

          <Text style="custom" className="text-lg font-bold">
            Colour Theme
          </Text>
          <Column align="left">
            <div className="flex gap-2">
              <input
                type="radio"
                id="theme-1"
                name="colour-theme"
                value="auto"
              />
              <label htmlFor="theme-1"> Auto </label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="theme-2"
                name="colour-theme"
                value="light"
              />
              <label htmlFor="theme-2"> Light </label>
            </div>

            <div className="flex gap-2">
              <input
                type="radio"
                id="theme-3"
                name="colour-theme"
                value="dark"
              />
              <label htmlFor="theme-3"> Dark </label>
            </div>
          </Column>

          {/* Reset Commute button  */}
          {/* Reset Cookies button  */}
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
