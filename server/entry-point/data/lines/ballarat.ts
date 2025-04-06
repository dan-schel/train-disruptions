import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.BALLARAT,
  name: "Ballarat",
  ptvIds: [1728, 1837, 4871],
  route: route.BALLARAT,
  lineGroup: "regional",
});
