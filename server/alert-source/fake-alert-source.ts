import { Disruption } from "@/types/disruption";
import { AlertSource } from "@/server/alert-source/alert-source";

// For testing purposes.
export class FakeAlertSource extends AlertSource {
  private _alerts: Disruption[] = [];

  setAlerts(alerts: Disruption[]) {
    this._alerts = alerts;
  }

  async fetchDisruptions(): Promise<Disruption[]> {
    return this._alerts;
  }

  async fetchDetails(_url: string): Promise<string | null> {
    return null;
  }
}
