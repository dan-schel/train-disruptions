import React from "react";

import { useData } from "vike-react/useData";
import { Data } from "@/pages/settings/+data";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { SettingsStartPage } from "@/pages/settings/SettingsStartPage";
import { SettingsDisruptions } from "@/pages/settings/SettingsDisruptions";
import { SettingsTheme } from "@/pages/settings/SettingsTheme";
import { SettingsCommute } from "@/pages/settings/SettingsCommute";
import { SettingsReset } from "@/pages/settings/SettingsReset";
import { SettingsAdmin } from "@/pages/settings/SettingsAdmin";
import { useSettings } from "@/hooks/useSettings";
import { SettingsTitle } from "@/pages/settings/SettingsTitle";
import { Spacer } from "@/components/core/Spacer";

export default function Page() {
  const { stations } = useData<Data>();
  const [settings] = useSettings();

  const [showAdminTabSetting, setShowAdminTabSetting] = React.useState(
    settings.showAdminTab,
  );

  function handleRepeatedTitleClicks() {
    setShowAdminTabSetting(true);
  }

  return (
    <PageCenterer>
      <PagePadding>
        <Column>
          <SettingsTitle onRepeatedClicks={handleRepeatedTitleClicks} />
          <Spacer h="4" />
          <SettingsStartPage />
          <Spacer h="8" />
          <SettingsDisruptions />
          <Spacer h="8" />
          <SettingsTheme />
          <Spacer h="8" />
          <SettingsCommute stations={stations} />
          {showAdminTabSetting && (
            <>
              <Spacer h="8" />
              <SettingsAdmin />
            </>
          )}
          <Spacer h="8" />
          <SettingsReset />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
