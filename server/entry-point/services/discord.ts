import { DiscordClient } from "@/server/discord";
import { env } from "@/server/entry-point/env";

export function initDiscordClient(): DiscordClient | null {
  if (env.DISCORD_DEPLOYMENT_WEBHOOK && env.COMMIT_HASH) {
    return new DiscordClient(env.DISCORD_DEPLOYMENT_WEBHOOK, env.COMMIT_HASH);
  } else {
    return null;
  }
}
