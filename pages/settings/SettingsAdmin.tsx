import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { useSettings } from "@/hooks/useSettings";
import { Spacer } from "@/components/core/Spacer";

export function SettingsAdmin() {
  const [settings, setSettings] = useSettings();

  function handleChange() {
    setSettings(settings.with({ showAdminTab: !settings.showAdminTab }));
  }

  return (
    <Column>
      <Text style="subtitle">Admin</Text>
      <Spacer h="2" />

      <label className="hover:bg-soft-hover flex cursor-pointer items-center justify-between py-2">
        <input
          type="checkbox"
          value={"showAdminTab"}
          autoComplete="off"
          className="peer sr-only"
          checked={settings.showAdminTab}
          onChange={handleChange}
        />
        <Column className="gap-1">
          <Text>Show Admin Tab</Text>
        </Column>
        <div className="bg-switch peer-checked:bg-accent hover:bg-switch-hover hover:peer-checked:bg-accent-hover flex h-5 w-9 items-center rounded-full p-0.5 transition-transform ease-in-out peer-checked:*:translate-x-full peer-disabled:opacity-50">
          <div className="bg-switch-knob size-4 rounded-full transition-all" />
        </div>
      </label>
    </Column>
  );
}
