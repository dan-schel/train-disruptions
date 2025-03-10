import React from "react";

import { SimpleButton } from "../../components/common/SimpleButton";
import { Settings } from "../../shared/settings";
import { Column } from "../../components/core/Column";
import { Text } from "../../components/core/Text";
import { Spacer } from "../../components/core/Spacer";

export type SettingsResetProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export function SettingsReset({ setSettings }: SettingsResetProps) {
  function handleResetCookies() {
    setSettings(Settings.default);
  }

  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Reset
      </Text>
      <Spacer h="2" />
      <Text>
        Reset all settings to their default values. This cannot be undone!
      </Text>
      <Spacer h="4" />
      <SimpleButton onClick={handleResetCookies} text="Reset" />
    </Column>
  );
}
