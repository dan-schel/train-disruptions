import { Line } from "./line";
import { LineCollection } from "./line-collection";
import * as line from "./line-ids";

const data = [
  new Line({ id: line.SANDRINGHAM, name: "Sandringham", ptvIds: [12] }),
  new Line({ id: line.FRANKSTON, name: "Frankston", ptvIds: [6] }),
  new Line({ id: line.STONY_POINT, name: "Stony Point", ptvIds: [13] }),
  new Line({ id: line.CRANBOURNE, name: "Cranbourne", ptvIds: [4] }),
  new Line({ id: line.PAKENHAM, name: "Pakenham", ptvIds: [11] }),
  new Line({ id: line.GIPPSLAND, name: "Gippsland", ptvIds: [1823, 1824] }),
  new Line({ id: line.GLEN_WAVERLEY, name: "Glen Waverley", ptvIds: [7] }),
  new Line({ id: line.ALAMEIN, name: "Alamein", ptvIds: [1] }),
  new Line({ id: line.BELGRAVE, name: "Belgrave", ptvIds: [2] }),
  new Line({ id: line.LILYDALE, name: "Lilydale", ptvIds: [9] }),
  new Line({ id: line.HURSTBRIDGE, name: "Hurstbridge", ptvIds: [8] }),
  new Line({ id: line.MERNDA, name: "Mernda", ptvIds: [5] }),
  new Line({ id: line.UPFIELD, name: "Upfield", ptvIds: [15] }),
  new Line({ id: line.CRAIGIEBURN, name: "Craigieburn", ptvIds: [3] }),
  new Line({ id: line.SEYMOUR, name: "Seymour", ptvIds: [1706, 1710, 1908] }),
  new Line({ id: line.FLEMINGTON_RACECOURSE, name: "Flemington Racecourse", ptvIds: [1482] }),
  new Line({ id: line.SUNBURY, name: "Sunbury", ptvIds: [14] }),
  new Line({ id: line.BENDIGO, name: "Bendigo", ptvIds: [1740, 1848, 1849] }),
  new Line({ id: line.BALLARAT, name: "Ballarat", ptvIds: [1728, 1837, 4871] }),
  new Line({ id: line.GEELONG, name: "Geelong", ptvIds: [1745, 1853] }),
  new Line({ id: line.WERRIBEE, name: "Werribee", ptvIds: [16] }),
  new Line({ id: line.WILLIAMSTOWN, name: "Williamstown", ptvIds: [17] }),
];

export const lines = new LineCollection(data);
