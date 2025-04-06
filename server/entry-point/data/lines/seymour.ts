import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.SEYMOUR,
  name: "Seymour",
  ptvIds: [1706, 1710, 1908],
  route: route.SEYMOUR,
  lineGroup: "regional",
});
