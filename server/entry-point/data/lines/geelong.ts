import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.GEELONG,
  name: "Geelong",
  ptvIds: [1745, 1853],
  route: route.GEELONG,
  lineGroup: "regional",
});
