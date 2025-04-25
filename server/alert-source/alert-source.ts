import { Disruption } from "@/types/disruption";

export type Details = { details: string } | { error: DetailsError };

export type DetailsError =
  | "invalid-request"
  | "unknown-error"
  | "not-found"
  | "unsupported-url"
  | "rate-limited";

export abstract class AlertSource {
  abstract fetchDisruptions(): Promise<Disruption[]>;
  abstract fetchDetails(url: string): Promise<Details>;
}
