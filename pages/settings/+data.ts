import { PageContext } from "vike/types";
import { z } from "zod";
import { Settings } from "../../shared/settings";

export { data };

export type Data = {
  settings: z.input<typeof Settings.json>;
};

function data(pageContext: PageContext): Data {
  const { settings } = pageContext.custom;

  return {
    settings: settings.toJSON(),
  };
}
