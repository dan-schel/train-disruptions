import { DataAsync } from "vike/types";

import { Station } from "../../server/data/station";
import { stations } from "../../server/data/stations";

export { data };
export type Data = {
  toStation: Station | null;
  fromStation: Station | null;
  stations: Station[];
};

const data: DataAsync = async (pageContext): Promise<Data> => {
  const { to, from } = pageContext.urlParsed.search;
  const toStation = stations.get(parseInt(to));
  const fromStation = stations.get(parseInt(from));

  return { toStation, fromStation, stations: stations.all() };
};
