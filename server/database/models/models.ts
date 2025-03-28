import { DeploymentLogModel } from "@/server/database/models/deployment-logs";
import { HistoricalAlertModel } from "@/server/database/models/historical-alert";
import { AdminModel } from "@/server/database/models/admin";

export const HISTORICAL_ALERTS = HistoricalAlertModel.instance;
export const DEPLOYMENT_LOGS = DeploymentLogModel.instance;
export const ADMINS = AdminModel.instance;
