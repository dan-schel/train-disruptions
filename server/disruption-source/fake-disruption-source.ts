import { Disruption } from "@/types/disruption";
import { DisruptionSource } from "@/server/disruption-source/disruption-source";

// For testing purposes.
export class FakeDisruptionSource extends DisruptionSource {
  async fetchDisruptions(): Promise<Disruption[]> {
    return [];
  }
}
