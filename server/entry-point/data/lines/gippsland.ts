import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.GIPPSLAND,
  name: "Gippsland",
  ptvIds: [1823, 1824],
  route: route.GIPPSLAND,
  lineGroup: "regional",
});
