import { lineWidth } from "../../../components/map/renderer/utils";
import { flexi } from "./dimensions/flexi-length";

export const interchangeEdgeOffset = flexi(lineWidth / 2);
export const interchangeInnerOffset = flexi(1);
export const terminusExtents = flexi(5);
