import { Disruption } from "@/types/disruption";
import { AlertSource } from "@/server/alert-source/alert-source";

// For testing purposes.
export class FakeAlertSource extends AlertSource {
  async fetchDisruptions(): Promise<Disruption[]> {
    return [];
  }
}
