import { Request, Response } from "express";
import { cookieSettings, Settings } from "../shared/settings";

/** Extracts the user settings from an Express request's cookies. */
export function getSettings(req: Request): Settings {
  const settingsStr = req.cookies?.settings;
  return settingsStr == null
    ? Settings.default
    : Settings.tryParse(settingsStr);
}

/**
 * Updates the user's settings cookie by attaching the "Set-Cookie" header to an
 * express response. Must be used before .json() or .send() in the response
 * chain.
 */
export function setSettings(res: Response, settings: Settings): Response {
  return res.cookie("settings", JSON.stringify(settings.toJSON()), {
    sameSite: cookieSettings.sameSite,
    secure: cookieSettings.secure,
    expires: new Date(Date.now() + cookieSettings.maxAgeMillis),
  });
}
