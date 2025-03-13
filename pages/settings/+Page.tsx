import React, { useEffect } from "react";

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

import { SimpleButton } from "@/components/common/SimpleButton";

export default function Page() {
  const { fetchSettings, updateSettings } = useSettings();

  const data = useData<Data>();

  const [settings, setSettings] = React.useState(
    Settings.json.parse(data.settings),
  );

  const { setSettings: setCookie } = useSettings();

  useEffect(() => {
    setCookie(settings);
  }, [settings, setCookie]);

  return (
    <PageCenterer>
      <PagePadding>
        <Column className="gap-4">
          <Text style="title">Settings</Text>

          {/* TEMP - for debugging/test */}
          <SimpleButton
            onClick={() => {
              const isDark = fetchSettings().theme === "dark";
              updateSettings((s) =>
                s.with({
                  theme: isDark ? "light" : "dark",
                }),
              );

              // To set the theme to `system` preference, set the className to "";
              document.documentElement.className = isDark ? "light" : "dark";
            }}
            text="Toggle theme"
          />
          <SettingsHome settings={settings} setSettings={setSettings} />
          <SettingsDisruptions settings={settings} setSettings={setSettings} />
          <SettingsTheme />
          <SettingsCommute
            settings={settings}
            setSettings={setSettings}
            stations={data.stations}
          />
          <SettingsReset settings={settings} setSettings={setSettings} />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
