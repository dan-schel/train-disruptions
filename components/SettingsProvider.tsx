import React, { useEffect } from "react";

import { cookieSettings, Settings } from "@/shared/settings";
import { usePageContext } from "vike-react/usePageContext";
import Cookies from "js-cookie";
import { SettingsContext, SettingsContextContent } from "@/hooks/useSettings";

const cookies = Cookies.withAttributes({
  sameSite: cookieSettings.sameSite,
  secure: cookieSettings.secure,
  expires: cookieSettings.maxAgeDays,
});

export type SettingsProviderProps = {
  children: React.ReactNode;
};

export function SettingsProvider(props: SettingsProviderProps) {
  const settingsJson = usePageContext().client.settings;

  const [settings, setSettings] = React.useState(
    Settings.json.parse(settingsJson),
  );

  const contextValue: SettingsContextContent = {
    initialized: true,
    settings,
    setSettings,
  };

  useEffect(() => {
    cookies.set("settings", JSON.stringify(settings.toJSON()));
  }, [settings]);

  return (
    <SettingsContext.Provider value={contextValue}>
      {props.children}
    </SettingsContext.Provider>
  );
}
