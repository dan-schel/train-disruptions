import React, { useEffect } from "react";

import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { SettingsHome } from "./SettingsHome";
import { SettingsDisruptions } from "./SettingsDisruptions";
import { SettingsTheme } from "./SettingsTheme";
import { SettingsCommute } from "./SettingsCommute";
import { SettingsReset } from "./SettingsReset";
import { Settings } from "../../shared/settings";
import { useSettings } from "../../hooks/useSettings";

export default function Page() {
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

          {JSON.stringify(settings.toJSON())}

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
