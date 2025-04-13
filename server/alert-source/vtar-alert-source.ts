import { z } from "zod";
import { Disruption, disruptionSchema } from "@/types/disruption";
import { AlertSource } from "@/server/alert-source/alert-source";

export class VtarAlertSource extends AlertSource {
  constructor(
    private vtarUrl: string,
    private relayKey: string,
  ) {
    super();
  }

  async fetchDisruptions(): Promise<Disruption[]> {
    const responseSchema = z.object({
      disruptions: z.object({
        general: disruptionSchema.array(),
        metro_train: disruptionSchema.array(),
        regional_train: disruptionSchema.array(),
      }),
    });

    const response = await fetch(`${this.vtarUrl}/ptv-disruptions.json`, {
      headers: {
        "relay-key": this.relayKey,
      },
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = responseSchema.parse(await response.json());

    // Join general, metro, and regional train disruptions into one array
    const combined = [
      ...data.disruptions.general,
      ...data.disruptions.metro_train,
      ...data.disruptions.regional_train,
    ];

    return combined;
  }

  async fetchDetails(url: string): Promise<string | null> {
    const responseSchema = z.union([
      z.object({ error: z.literal(true) }),
      z.object({ details: z.string() }),
    ]);

    const response = await fetch(
      `${this.vtarUrl}/ptv-disruption-details?url=${encodeURIComponent(url)}`,
      {
        headers: {
          "relay-key": this.relayKey,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    const data = responseSchema.parse(await response.json());

    // Return null to indicate the fetch worked, but VTAR failed to extract
    // the disruption details.
    if ("error" in data) {
      return null;
    }

    return data.details;
  }
}
