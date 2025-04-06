import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.HURSTBRIDGE,
  name: "Hurstbridge",
  ptvIds: [8],
  route: route.HURSTBRIDGE,
  lineGroup: "suburban",
});
