import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { Spacer } from "../../components/core/Spacer";

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

          <Spacer h="4" />

          <Text style="custom" className="text-lg font-bold">
            Disruptions to Show
          </Text>

          <Spacer h="4" />

          <Text style="custom" className="text-lg font-bold">
            Colour Theme
          </Text>

        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
