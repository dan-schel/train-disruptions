import { CrayonModel } from "@/server/database/models/crayons";
import { HistoricalAlertModel } from "@/server/database/models/historical-alert";

export const CRAYONS = CrayonModel.instance;
export const HISTORICAL_ALERTS = HistoricalAlertModel.instance;
