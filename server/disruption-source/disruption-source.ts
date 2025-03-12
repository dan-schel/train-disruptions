import { Disruption } from "@/types/disruption";

export abstract class DisruptionSource {
  abstract fetchDisruptions(): Promise<Disruption[]>;
}
