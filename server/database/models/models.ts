import { DeploymentLogModel } from "@/server/database/models/deployment-logs";
import { HistoricalAlertModel } from "@/server/database/models/historical-alert";
import { UserModel } from "@/server/database/models/user";

export const HISTORICAL_ALERTS = HistoricalAlertModel.instance;
export const DEPLOYMENT_LOGS = DeploymentLogModel.instance;
export const USERS = UserModel.instance;
