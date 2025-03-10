import { PageContext } from "vike/types";
import { z } from "zod";
import { Settings } from "../../shared/settings";
import { JsonSerializable } from "../../shared/json-serializable";

export { data };

export type Data = {
  settings: z.input<typeof Settings.json>;
  stations: {
    id: number;
    name: string;
  }[];
};

function data(pageContext: PageContext): Data & JsonSerializable {
  const { app, settings } = pageContext.custom;

  return {
    settings: settings.toJSON(),
    stations: app.stations
      .all()
      .map((station) => ({ id: station.id, name: station.name })),
  };
}
