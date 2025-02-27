import { renderPage } from "vike/server";
import express from "express";
import { getSettings } from "./settings";
import { App } from "./app";
import { Settings } from "../shared/settings";

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
    const settings = getSettings(req);

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
