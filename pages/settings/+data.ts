import { PageContext } from "vike/types";
import { JsonSerializable } from "@/shared/json-serializable";

export { data };

export type Data = {
  stations: {
    id: number;
    name: string;
  }[];
};

function data(pageContext: PageContext): Data & JsonSerializable {
  const { app } = pageContext.custom;

  return {
    stations: app.stations
      .all()
      .map((station) => ({ id: station.id, name: station.name })),
  };
}
