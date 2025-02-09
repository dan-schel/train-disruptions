import { DataAsync } from "vike/types";
import { lines } from "../../../server/data/static/lines";
import { Line } from "../../../server/data/static/line";

export { data };
export type Data = {
  line: Line | null;
};

const data: DataAsync = async (pageContext): Promise<Data> => {
  const line = lines.get(parseInt(pageContext.routeParams.id));

  return { line };
};
