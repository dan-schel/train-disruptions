import React from "react";

import { Column } from "@/components/core/Column";
import { PageCenterer } from "@/components/common/PageCenterer";
import { PagePadding } from "@/components/common/PagePadding";
import { SettingsDisruptions } from "@/components/settings/SettingsDisruptions";
import { SettingsTheme } from "@/components/settings/SettingsTheme";
import { SettingsReset } from "@/components/settings/SettingsReset";
import { SettingsAdmin } from "@/components/settings/SettingsAdmin";
import { useSettings } from "@/components/settings/common/use-settings";
import { SettingsTitle } from "@/components/settings/SettingsTitle";

export default function Page() {
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
          <Column className="gap-8">
            <SettingsDisruptions />
            <SettingsTheme />
            {showAdminTabSetting && <SettingsAdmin />}
            <SettingsReset />
          </Column>
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
