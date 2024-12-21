import { z } from "zod";

export abstract class DisruptionSource {
  abstract fetchDisruptions(): Promise<string[]>;
}

export class VtarDisruptionSource extends DisruptionSource {
  constructor(
    private endpointUrl: string,
    private relayKey: string,
  ) {
    super();
  }

  async fetchDisruptions(): Promise<string[]> {
    const disruptionSchema = z.object({
      title: z.string(),
    });

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

    // Join general, metro, and regional train disruptions into one array, and
    // extract just the titles.
    const combined = [
      ...data.disruptions.general.map((d) => d.title),
      ...data.disruptions.metro_train.map((d) => d.title),
      ...data.disruptions.regional_train.map((d) => d.title),
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
  async fetchDisruptions(): Promise<string[]> {
    // eslint-disable-next-line no-console
    console.log("🟡 Relay connection not set up yet.");
    return ["Buses replace trains between X and Y."];
  }
}
