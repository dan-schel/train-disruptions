import React, { useEffect, useState } from "react";

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
import { Settings } from "@/shared/settings";
import { useSettings } from "@/hooks/useSettings";
import { useAdminVisibilityContext } from "@/context/AdminVisibility";
import { SettingsAdmin } from "@/pages/settings/SettingsAdmin";

export default function Page() {
  const data = useData<Data>();
  const { showToggle } = useAdminVisibilityContext();

  const [showAdmin, setShowAdmin] = useState<boolean>(false);
  const [settings, setSettings] = useState(Settings.json.parse(data.settings));

  const { setSettings: setCookie } = useSettings();

  useEffect(() => {
    setCookie(settings);
  }, [settings, setCookie]);

  useEffect(() => {
    setShowAdmin(showToggle);
  }, [showToggle]);

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
          {showAdmin && (
            <SettingsAdmin settings={settings} setSettings={setSettings} />
          )}
          <SettingsReset settings={settings} setSettings={setSettings} />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
