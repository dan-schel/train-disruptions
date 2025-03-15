import { Disruption } from "@/types/disruption";

export abstract class AlertSource {
  abstract fetchDisruptions(): Promise<Disruption[]>;
}
