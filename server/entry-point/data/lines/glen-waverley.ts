import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.GLEN_WAVERLEY,
  name: "Glen Waverley",
  ptvIds: [7],
  route: route.GLEN_WAVERLEY,
  lineGroup: "suburban",
});
