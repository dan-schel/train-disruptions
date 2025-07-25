import { App } from "@/server/app";
import { Alert } from "@/server/data/alert";
import { AlertModel } from "@/server/database/models/alert";
import { ALERTS } from "@/server/database/models/models";
import { Repository } from "@dan-schel/db";

type ListAlertFilter = {
  ids?: Array<Alert["id"]>;
  state?: Array<"new" | "processed" | "ignored" | "updated">;
};

type GetAlertFilter = {
  id: Alert["id"];
};

export class AlertSource {
  private static instance: AlertSource;
  private database: Repository<AlertModel>;

  private constructor(app: App) {
    this.database = app.database.of(ALERTS);
  }

  static getInstance(app: App): AlertSource {
    if (!this.instance) {
      this.instance = new AlertSource(app);
    }

    return this.instance;
  }

  async listAlerts({ ids, state }: ListAlertFilter) {
    return (await this.database.all())
      .filter(this._filterByIds(ids))
      .filter(this._filterByState(state));
  }

  async getAlert({ id }: GetAlertFilter) {
    return await this.database.get(id);
  }

  async getFirstAlert({ ids }: Pick<ListAlertFilter, "ids">) {
    return (await this.database.all()).find(this._filterByIds(ids)) ?? null;
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
