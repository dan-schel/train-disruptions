import { DataAsync } from "vike/types";
import { Line } from "../../server/data/static/line";
import { lines } from "../../server/data/static/lines";
import {
  BALLARAT,
  BENDIGO,
  GEELONG,
  GIPPSLAND,
  SEYMOUR,
} from "../../server/data/static/line-routes/line-routes";

export { data };
export type Data = {
  suburban: Line[];
  regional: Line[];
};

const RegionalRoutes = [BALLARAT, BENDIGO, GEELONG, GIPPSLAND, SEYMOUR];

const SortByNameDesc = (a: Line, b: Line) => a.name.localeCompare(b.name);

const data: DataAsync = async (): Promise<Data> => {
  const [suburban, regional] = lines.all().reduce(
    ([s, r], line) => {
      return RegionalRoutes.findIndex((l) => l === line.route) !== -1
        ? [s, r.concat(line)]
        : [s.concat(line), r];
    },
    [<Line[]>[], <Line[]>[]],
  );

  return {
    suburban: suburban.sort(SortByNameDesc),
    regional: regional.sort(SortByNameDesc),
  };
};
