import { DiscordClient } from "@/server/discord";
import { DiscordBot } from "@/server/discord/bot";
import { env } from "@/server/entry-point/env";

export function initDiscordClient(): DiscordClient | null {
  if (env.DISCORD_DEPLOYMENT_WEBHOOK && env.COMMIT_HASH) {
    return new DiscordClient(env.DISCORD_DEPLOYMENT_WEBHOOK, env.COMMIT_HASH);
  } else {
    return null;
  }
}

export function initDiscordBot(): DiscordBot | null {
  if (env.DISCORD_TOKEN && env.DISCORD_CHANNEL) {
    return new DiscordBot(env.DISCORD_TOKEN, env.DISCORD_CHANNEL);
  } else {
    return null;
  }
}
