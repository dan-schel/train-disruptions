import React from "react";

import { SimpleButton } from "@/components/common/SimpleButton";
import { Settings } from "@/shared/settings";
import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Spacer } from "@/components/core/Spacer";
import { applyTheme } from "@/pages/settings/utils";
import { useSettings } from "@/hooks/useSettings";

export function SettingsReset() {
  const [, setSettings] = useSettings();

  function handleResetCookies() {
    setSettings(Settings.default);
    applyTheme(Settings.default.theme);
  }

  return (
    <Column align="left">
      <Text style="subtitle">Reset</Text>
      <Spacer h="4" />
      <Text>
        Reset all settings to their default values. This cannot be undone!
      </Text>
      <Spacer h="4" />
      <SimpleButton onClick={handleResetCookies} text="Reset" />
    </Column>
  );
}
