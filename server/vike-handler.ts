import { renderPage } from "vike/server";
import express from "express";
import { getSettings, validateSettings } from "@/server/settings";
import { App } from "@/server/app";
import { Settings } from "@/shared/settings";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      custom: CustomPageContext;
      urlOriginal: string;
    }
  }
}

export type CustomPageContext = {
  app: App;
  settings: Settings;
};

export function createVikeHandler(app: App) {
  return async (req: express.Request, res: express.Response) => {
    // TODO: Arguably, we should also update the cookie if the validation causes
    // the settings to change.
    const settings = validateSettings(getSettings(req), app.stations);

    const { body, statusCode, headers } = (
      await renderPage({
        custom: {
          app,
          settings,
        },
        urlOriginal: req.url,
      } satisfies Vike.PageContext)
    ).httpResponse;

    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode).send(body);
  };
}
