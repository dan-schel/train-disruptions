import { App } from "@/server/app";
import { Alert } from "@/server/data/alert";
import { AlertModel } from "@/server/database/models/alert";
import { ALERTS } from "@/server/database/models/models";
import { Repository } from "@dan-schel/db";

type ListAlertFilter = {
  ids?: Alert["id"][];
  state?: ("new" | "processed" | "ignored" | "updated")[];
};

export class AlertRepository {
  private static repository: AlertRepository;
  private database: Repository<AlertModel>;

  constructor(app: App) {
    this.database = app.database.of(ALERTS);
  }

  static getRepository(app: App): AlertRepository {
    if (!this.repository) {
      this.repository = new AlertRepository(app);
    }

    return this.repository;
  }

  async listAlerts({ ids, state }: ListAlertFilter) {
    return (await this.database.all())
      .filter(this._filterByIds(ids))
      .filter(this._filterByState(state));
  }

  async getAlert(id: Alert["id"]) {
    return await this.database.get(id);
  }

  private _filterByIds(ids: ListAlertFilter["ids"]) {
    return function (alert: Alert) {
      if (!ids) return true;
      return ids.includes(alert.id);
    };
  }

  private _filterByState(state: ListAlertFilter["state"]) {
    return function (alert: Alert) {
      if (!state) return true;
      return state.includes(alert.getState());
    };
  }
}
