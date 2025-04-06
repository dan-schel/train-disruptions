import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.STONY_POINT,
  name: "Stony Point",
  ptvIds: [13],
  route: route.STONY_POINT,
  lineGroup: "suburban",
});
