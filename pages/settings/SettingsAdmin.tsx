import React, { Dispatch, SetStateAction } from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Settings } from "@/shared/settings";
import { useAdminVisibilityContext } from "@/context/AdminVisibility";

type SettingsAdminProps = {
  settings: Settings;
  setSettings: Dispatch<SetStateAction<Settings>>;
};

export function SettingsAdmin({ settings, setSettings }: SettingsAdminProps) {
  const { toggleAdminTab } = useAdminVisibilityContext();

  function handleChange() {
    setSettings(settings.with({ showAdminTab: !settings.showAdminTab }));
    toggleAdminTab();
  }
  return (
    <Column>
      <Text style="custom" className="text-foreground-strong text-lg font-bold">
        Admin
      </Text>

      <label className="hover:bg-soft-hover flex h-9 cursor-pointer items-center justify-between">
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
