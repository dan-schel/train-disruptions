import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.SANDRINGHAM,
  name: "Sandringham",
  ptvIds: [12],
  route: route.SANDRINGHAM,
  lineGroup: "suburban",
});
