import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.BENDIGO,
  name: "Bendigo",
  ptvIds: [1740, 1848, 1849],
  route: route.BENDIGO,
  lineGroup: "regional",
});
