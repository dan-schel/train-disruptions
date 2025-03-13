import { Request, Response } from "express";
import { cookieSettings, Settings } from "@/shared/settings";
import { StationCollection } from "@/server/data/static/station-collection";

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

/**
 * Returns the same settings object, but with any settings which can no longer
 * valid updated to valid values (e.g. reset the commute if a station no longer
 * exists).
 */
export function validateSettings(
  settings: Settings,
  stations: StationCollection,
): Settings {
  // Reset commutes to stations that no longer exist.
  if (
    settings.commute !== null &&
    (!stations.has(settings.commute.a) || !stations.has(settings.commute.b))
  ) {
    return settings.with({ commute: null });
  }

  return settings;
}
