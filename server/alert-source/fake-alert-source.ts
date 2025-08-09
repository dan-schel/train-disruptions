import { PtvAlert } from "@/server/alert-source/ptv-alert";
import { AlertSource, Details } from "@/server/alert-source/alert-source";

// For testing purposes.
export class FakeAlertSource extends AlertSource {
  private _alerts: PtvAlert[] = [];

  setAlerts(alerts: PtvAlert[]) {
    this._alerts = alerts;
  }

  async fetchDisruptions(): Promise<PtvAlert[]> {
    return this._alerts;
  }

  async fetchDetails(_url: string): Promise<Details> {
    return { error: "not-found" };
  }
}
