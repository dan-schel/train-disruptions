import React from "react";

import { SimpleButton } from "@/components/common/SimpleButton";
import { Settings } from "@/shared/settings";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { applyTheme } from "@/components/settings/common/utils";
import { useSettings } from "@/components/settings/common/use-settings";

export function SettingsReset() {
  const [, setSettings] = useSettings();

  function handleResetCookies() {
    setSettings(Settings.default);
    applyTheme(Settings.default.theme);
  }

  return (
    <Column align="left" className="gap-4">
      <Text style="subtitle">Reset</Text>
      <Text>
        Reset all settings to their default values. This cannot be undone!
      </Text>
      <SimpleButton onClick={handleResetCookies} text="Reset" />
    </Column>
  );
}
