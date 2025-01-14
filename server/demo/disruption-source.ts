import { z } from "zod";
import { Disruption, disruptionSchema } from "../../types/disruption";

export abstract class DisruptionSource {
  abstract fetchDisruptions(): Promise<Disruption[]>;
}

export class VtarDisruptionSource extends DisruptionSource {
  constructor(
    private endpointUrl: string,
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

    const response = await fetch(this.endpointUrl, {
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

    // eslint-disable-next-line no-console
    console.log(
      `🟢 Successfully fetched ${combined.length} disruption(s) from VTAR.`,
    );
    return combined;
  }
}

// For testing purposes.
export class FakeDisruptionSource extends DisruptionSource {
  async fetchDisruptions(): Promise<Disruption[]> {
    // eslint-disable-next-line no-console
    console.log("🟡 Relay connection not set up yet.");
    return [];
  }
}
