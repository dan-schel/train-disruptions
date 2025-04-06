import * as id from "@/shared/line-ids";
import * as route from "@/server/entry-point/data/line-routes";
import { Line } from "@/server/data/line/line";

export const line = new Line({
  id: id.FLEMINGTON_RACECOURSE,
  name: "Flemington Racecourse",
  ptvIds: [1482],
  route: route.FLEMINGTON_RACECOURSE,
  lineGroup: "suburban",
});
