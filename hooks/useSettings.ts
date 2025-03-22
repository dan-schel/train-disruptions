import React from "react";
import { Settings } from "@/shared/settings";

export type SettingsContextContent = {
  initialized: boolean;
  settings: Settings;
  setSettings: React.Dispatch<React.SetStateAction<Settings>>;
};

export const SettingsContext = React.createContext<SettingsContextContent>({
  initialized: false,
  settings: Settings.default,
  setSettings() {},
});

export function useSettings() {
  const { initialized, settings, setSettings } =
    React.useContext(SettingsContext);

  if (!initialized) {
    throw new Error("Attempting to use settings outside <SettingsProvider>.");
  }

  return [settings, setSettings] as const;
}
