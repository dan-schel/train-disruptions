import Cookies from "js-cookie";
import { cookieSettings, Settings } from "../shared/settings";

const cookies = Cookies.withAttributes({
  sameSite: cookieSettings.sameSite,
  secure: cookieSettings.secure,
  expires: cookieSettings.maxAgeDays,
});

/** Hook to retrieve and set the user settings cookie. */
export function useSettings() {
  const settingsStr = cookies.get("settings");

  const settings =
    settingsStr == null ? Settings.default : Settings.tryParse(settingsStr);

  return [settings, setSettings];
}

function setSettings(settings: Settings) {
  cookies.set("settings", JSON.stringify(settings.toJSON()));
}
