import { Line } from "./line";
import { LineCollection } from "./line-collection";
import * as line from "./line-ids";
import * as route from "./line-routes/line-routes";

const data = [
  new Line({
    id: line.SANDRINGHAM,
    name: "Sandringham",
    ptvIds: [12],
    route: route.SANDRINGHAM,
  }),
  new Line({
    id: line.FRANKSTON,
    name: "Frankston",
    ptvIds: [6],
    route: route.FRANKSTON,
  }),
  new Line({
    id: line.STONY_POINT,
    name: "Stony Point",
    ptvIds: [13],
    route: route.STONY_POINT,
  }),
  new Line({
    id: line.CRANBOURNE,
    name: "Cranbourne",
    ptvIds: [4],
    route: route.CRANBOURNE,
  }),
  new Line({
    id: line.PAKENHAM,
    name: "Pakenham",
    ptvIds: [11],
    route: route.PAKENHAM,
  }),
  new Line({
    id: line.GIPPSLAND,
    name: "Gippsland",
    ptvIds: [1823, 1824],
    route: route.SANDRINGHAM,
  }),
  new Line({
    id: line.GLEN_WAVERLEY,
    name: "Glen Waverley",
    ptvIds: [7],
    route: route.GLEN_WAVERLEY,
  }),
  new Line({
    id: line.ALAMEIN,
    name: "Alamein",
    ptvIds: [1],
    route: route.ALAMEIN,
  }),
  new Line({
    id: line.BELGRAVE,
    name: "Belgrave",
    ptvIds: [2],
    route: route.BELGRAVE,
  }),
  new Line({
    id: line.LILYDALE,
    name: "Lilydale",
    ptvIds: [9],
    route: route.LILYDALE,
  }),
  new Line({
    id: line.HURSTBRIDGE,
    name: "Hurstbridge",
    ptvIds: [8],
    route: route.HURSTBRIDGE,
  }),
  new Line({
    id: line.MERNDA,
    name: "Mernda",
    ptvIds: [5],
    route: route.MERNDA,
  }),
  new Line({
    id: line.UPFIELD,
    name: "Upfield",
    ptvIds: [15],
    route: route.UPFIELD,
  }),
  new Line({
    id: line.CRAIGIEBURN,
    name: "Craigieburn",
    ptvIds: [3],
    route: route.CRAIGIEBURN,
  }),
  new Line({
    id: line.SEYMOUR,
    name: "Seymour",
    ptvIds: [1706, 1710, 1908],
    route: route.SEYMOUR,
  }),
  new Line({
    id: line.FLEMINGTON_RACECOURSE,
    name: "Flemington Racecourse",
    ptvIds: [1482],
    route: route.FLEMINGTON_RACECOURSE,
  }),
  new Line({
    id: line.SUNBURY,
    name: "Sunbury",
    ptvIds: [14],
    route: route.SUNBURY,
  }),
  new Line({
    id: line.BENDIGO,
    name: "Bendigo",
    ptvIds: [1740, 1848, 1849],
    route: route.BENDIGO,
  }),
  new Line({
    id: line.BALLARAT,
    name: "Ballarat",
    ptvIds: [1728, 1837, 4871],
    route: route.BALLARAT,
  }),
  new Line({
    id: line.GEELONG,
    name: "Geelong",
    ptvIds: [1745, 1853],
    route: route.GEELONG,
  }),
  new Line({
    id: line.WERRIBEE,
    name: "Werribee",
    ptvIds: [16],
    route: route.WERRIBEE,
  }),
  new Line({
    id: line.WILLIAMSTOWN,
    name: "Williamstown",
    ptvIds: [17],
    route: route.WILLIAMSTOWN,
  }),
];

export const lines = new LineCollection(data);
