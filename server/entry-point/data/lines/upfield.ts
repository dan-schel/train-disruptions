import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.UPFIELD,
  name: "Upfield",
  ptvIds: [15],
  route: route.UPFIELD,
  lineGroup: "suburban",
});
