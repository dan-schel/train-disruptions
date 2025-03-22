import React from "react";

import { useData } from "vike-react/useData";
import { Data } from "@/pages/settings/+data";
import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { SettingsHome } from "@/pages/settings/SettingsHome";
import { SettingsDisruptions } from "@/pages/settings/SettingsDisruptions";
import { SettingsTheme } from "@/pages/settings/SettingsTheme";
import { SettingsCommute } from "@/pages/settings/SettingsCommute";
import { SettingsReset } from "@/pages/settings/SettingsReset";
import { SettingsAdmin } from "@/pages/settings/SettingsAdmin";
import { useSettings } from "@/components/SettingsProvider";
import { SettingsTitle } from "@/pages/settings/SettingsTitle";

export default function Page() {
  const data = useData<Data>();
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
        <Column className="gap-4">
          <SettingsTitle onRepeatedClicks={handleRepeatedTitleClicks} />
          <SettingsHome />
          <SettingsDisruptions />
          <SettingsTheme />
          <SettingsCommute stations={data.stations} />
          {showAdminTabSetting && <SettingsAdmin />}
          <SettingsReset />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
