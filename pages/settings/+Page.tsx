import React from "react";

import { useData } from "vike-react/useData";
import { Data } from "@/pages/settings/+data";
import { Text } from "@/components/core/Text";
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

export default function Page() {
  const data = useData<Data>();
  const [settings, setSettings] = useSettings();

  return (
    <PageCenterer>
      <PagePadding>
        <Column className="gap-4">
          <Text style="title">Settings</Text>
          <SettingsHome settings={settings} setSettings={setSettings} />
          <SettingsDisruptions settings={settings} setSettings={setSettings} />
          <SettingsTheme settings={settings} setSettings={setSettings} />
          <SettingsCommute
            settings={settings}
            setSettings={setSettings}
            stations={data.stations}
          />
          {settings.showAdminTab && (
            <SettingsAdmin settings={settings} setSettings={setSettings} />
          )}
          <SettingsReset settings={settings} setSettings={setSettings} />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
