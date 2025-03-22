import React from "react";

import { Column } from "@/components/core/Column";
import { Text } from "@/components/core/Text";
import { Settings } from "@/shared/settings";

type SettingsAdminProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export function SettingsAdmin({ settings, setSettings }: SettingsAdminProps) {
  function handleChange() {
    setSettings(settings.with({ showAdminTab: !settings.showAdminTab }));
  }

  return (
    <Column>
      <Text style="custom" className="text-lg font-bold">
        Admin
      </Text>

      <label className="flex h-9 cursor-pointer items-center justify-between hover:bg-gray-200 dark:hover:bg-gray-600">
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
        <div className="flex h-5 w-9 items-center rounded-full bg-gray-400 p-0.5 transition-all duration-500 ease-in-out peer-checked:bg-blue-600 peer-checked:*:translate-x-full peer-checked:*:border-white peer-disabled:opacity-50 hover:bg-blue-400 hover:peer-checked:bg-blue-500">
          <div className="size-4 rounded-full border border-gray-300 bg-white transition-all" />
        </div>
      </label>
    </Column>
  );
}
