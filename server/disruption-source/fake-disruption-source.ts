import { Disruption } from "../../types/disruption";
import { DisruptionSource } from "./disruption-source";

// For testing purposes.
export class FakeDisruptionSource extends DisruptionSource {
  async fetchDisruptions(): Promise<Disruption[]> {
    return [];
  }
}
