import React from "react";

import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { Spacer } from "../../components/core/Spacer";
import { SettingsHome } from "./SettingsHome";
import { SettingsDisruptions } from "./SettingsDisruptions";
import { SettingsTheme } from "./SettingsTheme";
import { SimpleButton } from "../../components/common/SimpleButton";

export default function Page() {
  const { commute, hiddenCategories } = useData<Data>();

  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <Text style="title">Settings</Text>
          <Spacer h="4" />

          <SettingsHome data={commute} />
          <SettingsDisruptions data={hiddenCategories} />
          <SettingsTheme />

          <SimpleButton onClick={() => {}} text="Reset Commute" />
          <Spacer h="4" />
          <SimpleButton onClick={() => {}} text="Reset Cookies" />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
