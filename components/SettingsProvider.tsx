import React, { useEffect } from "react";

import { cookieSettings, Settings } from "@/shared/settings";
import { usePageContext } from "vike-react/usePageContext";
import Cookies from "js-cookie";

const cookies = Cookies.withAttributes({
  sameSite: cookieSettings.sameSite,
  secure: cookieSettings.secure,
  expires: cookieSettings.maxAgeDays,
});

type SettingsContextContent = {
  initialized: boolean;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

const SettingsContext = React.createContext<SettingsContextContent>({
  initialized: false,
  settings: Settings.default,
  setSettings() {},
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

export function useSettings() {
  const { initialized, settings, setSettings } =
    React.useContext(SettingsContext);

  if (!initialized) {
    throw new Error("Attempting to use settings outside <SettingsProvider>.");
  }

  return [settings, setSettings] as const;
}
