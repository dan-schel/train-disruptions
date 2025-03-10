import React, { useEffect } from "react";

import { useData } from "vike-react/useData";
import { Data } from "./+data";
import { Text } from "../../components/core/Text";
import { Column } from "../../components/core/Column";
import { PageCenterer } from "../../components/common/PageCenterer";
import { PagePadding } from "../../components/common/PagePadding";
import { Spacer } from "../../components/core/Spacer";
import { SettingsHome } from "./SettingsHome";
import { SettingsDisruptions } from "./SettingsDisruptions";
import { SettingsTheme } from "./SettingsTheme";
import { ResetCommuteButton } from "./ResetCommuteButton";
import { ResetCookiesButton } from "./ResetCookiesButton";
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
        <Column>
          <Text style="title">Settings</Text>
          <Spacer h="4" />

          {JSON.stringify(settings.toJSON())}

          <SettingsHome settings={settings} setSettings={setSettings} />
          <SettingsDisruptions settings={settings} setSettings={setSettings} />
          <SettingsTheme />

          <ResetCommuteButton />
          <Spacer h="4" />
          <ResetCookiesButton />
        </Column>
      </PagePadding>
    </PageCenterer>
  );
}
