import Cookies from "js-cookie";
import { cookieSettings, Settings } from "@/shared/settings";

const fetchSettingsSsrError =
  "fetchSettings (from useSettings) failed, as it was used during SSR! Pass " +
  "the settings you need through a Vike +data hook instead.";

const setSettingsSsrError =
  "setSettings (from useSettings) failed, as it was used during SSR! To " +
  "update settings during SSR, use a 'Set-Cookie' header in the server " +
  "response instead.";

const updateSettingsSsrError =
  "updateSettings (from useSettings) failed, as it was used during SSR! To " +
  "update settings during SSR, use a 'Set-Cookie' header in the server " +
  "response instead.";

const cookies = Cookies.withAttributes({
  sameSite: cookieSettings.sameSite,
  secure: cookieSettings.secure,
  expires: cookieSettings.maxAgeDays,
});

/** Hook to retrieve and set the user settings cookie on the client-side. */
export function useSettings() {
  return { fetchSettings, setSettings, updateSettings };
}

function fetchSettings() {
  throwIfSsr(fetchSettingsSsrError);

  const settingsStr = cookies.get("settings");
  return settingsStr == null
    ? Settings.default
    : Settings.tryParse(settingsStr);
}

function setSettings(settings: Settings) {
  // TODO: To set settings during SSR, I've added a `setSettings` function in
  // `server/settings.ts`, but I haven't tested trying to use it from a +data
  // hook yet. Tbh, I'm not sure we even have a use case for changing settings
  // during SSR yet?
  throwIfSsr(setSettingsSsrError);

  cookies.set("settings", JSON.stringify(settings.toJSON()));
}

function updateSettings(updater: (settings: Settings) => Settings) {
  throwIfSsr(updateSettingsSsrError);

  setSettings(updater(fetchSettings()));
}

function throwIfSsr(errorMessage: string) {
  if (typeof window === "undefined") {
    throw new Error(errorMessage);
  }
}
