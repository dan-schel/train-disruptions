import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { useSettings } from "@/components/settings/use-settings";
import { Spacer } from "@/components/core/Spacer";
import { SettingsSwitch } from "@/components/settings/SettingsSwitch";

export function SettingsAdmin() {
  const [settings, setSettings] = useSettings();

  function handleChange() {
    setSettings(settings.with({ showAdminTab: !settings.showAdminTab }));
  }

  return (
    <Column>
      <Text style="subtitle">Admin</Text>
      <Spacer h="4" />
      <SettingsSwitch
        title="Show Admin tab"
        onChange={handleChange}
        checked={settings.showAdminTab}
      />
    </Column>
  );
}
