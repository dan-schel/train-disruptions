import { config } from "@/server/entry-point/config";
import { env } from "@/server/entry-point/env";
import { FakeDisruptionSource } from "@/server/disruption-source/fake-disruption-source";
import { VtarDisruptionSource } from "@/server/disruption-source/vtar-disruption-source";

/**
 * Ideally returns a VtarDisruptionSource, but falls back to a
 * FakeDisruptionSource if env.RELAY_KEY is not set.
 */
export function initDisruptionSource() {
  if (env.RELAY_KEY != null) {
    return new VtarDisruptionSource(config.VTAR_ENDPOINT_URL, env.RELAY_KEY);
  } else {
    return new FakeDisruptionSource();
  }
}
