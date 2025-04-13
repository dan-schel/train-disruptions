import { Disruption } from "@/types/disruption";

export abstract class AlertSource {
  abstract fetchDisruptions(): Promise<Disruption[]>;
  abstract fetchDetails(url: string): Promise<string | null>;
}
