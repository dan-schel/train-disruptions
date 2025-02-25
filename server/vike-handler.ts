import { renderPage } from "vike/server";
import express from "express";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Vike {
    interface PageContext {
      // TODO: Anything we add to pageContext should be added here too for
      // TypeScript support.

      // This cannot be removed. It's required by renderPage.
      urlOriginal: string;
    }
  }
}

export async function vikeHandler(req: express.Request, res: express.Response) {
  const { body, statusCode, headers } = (
    await renderPage({
      // Anything added here becomes available in pageContext.

      // TODO: Add stuff? The original implementation from the template included
      // essentially the entire req object.

      urlOriginal: req.url,
    } satisfies Vike.PageContext)
  ).httpResponse;

  const headersObj: Record<string, string> = {};
  headers.forEach(([name, value]) => {
    headersObj[name] = value;
  });

  res.status(statusCode).set(headersObj).send(body);
}
