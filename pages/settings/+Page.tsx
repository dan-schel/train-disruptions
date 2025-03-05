import React from "react";

import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { Spacer } from "../../components/core/Spacer";
import { SettingsHome } from "./SettingsHome";
import { SettingsDisruptions } from "./SettingsDisruptions";
import { SettingsTheme } from "./SettingsTheme";

export default function Page() {
  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="title">Settings</Text>
          <Spacer h="4" />

          <SettingsHome />
          <SettingsDisruptions />
          <SettingsTheme />

          {/* Reset Commute button  */}
          {/* Reset Cookies button  */}
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
