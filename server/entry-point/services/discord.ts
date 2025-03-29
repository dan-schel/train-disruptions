import { DiscordBot } from "@/server/discord/bot";
import { env } from "@/server/entry-point/env";

export function initDiscordBot(): DiscordBot | null {
  if (env.DISCORD_TOKEN && env.DISCORD_CHANNEL) {
    return new DiscordBot(env.DISCORD_TOKEN, env.DISCORD_CHANNEL);
  } else {
    return null;
  }
}
