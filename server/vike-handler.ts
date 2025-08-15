import { renderPage } from "vike/server";
import express from "express";
import { getSettings } from "@/server/settings";
import { App } from "@/server/app";
import { Settings } from "@/shared/settings";
import { z } from "zod";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      custom: CustomPageContext;
      client: ClientPageContext;
      urlOriginal: string;
    }
  }
}

export type CustomPageContext = {
  app: App;
  settings: Settings;
  user: { id: string; role: "super" | "admin" } | null;
};

export type ClientPageContext = {
  isProduction: boolean;
  settings: z.input<typeof Settings.json>;
};

export function createVikeHandler(app: App) {
  return async (req: express.Request, res: express.Response) => {
    const settings = getSettings(req);
    const user = req.session.getUser();

    const { body, statusCode, headers } = (
      await renderPage({
        custom: {
          app,
          settings,
          user,
        },
        client: {
          isProduction: app.env === "production",
          settings: settings.toJSON(),
        },
        urlOriginal: req.url,
      } satisfies Vike.PageContext)
    ).httpResponse;

    headers.forEach(([name, value]) => res.setHeader(name, value));
    res.status(statusCode).send(body);
  };
}
