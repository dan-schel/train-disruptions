import { DeploymentLogModel } from "@/server/database/models/deployment-logs";
import { HistoricalAlertModel } from "@/server/database/models/historical-alert";
import { AdminModel } from "@/server/database/models/admin";
import { SessionModel } from "@/server/database/models/session";
import { AlertModel } from "@/server/database/models/alert";

export const UNPROCESSED_ALERTS = AlertModel.instance;
export const HISTORICAL_ALERTS = HistoricalAlertModel.instance;
export const DEPLOYMENT_LOGS = DeploymentLogModel.instance;
export const ADMINS = AdminModel.instance;
export const SESSIONS = SessionModel.instance;
