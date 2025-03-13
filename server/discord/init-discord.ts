import { Discord } from "@/server/discord";
import { env } from "@/server/env";

export function initDiscord() {
  if (env.DISCORD_WEBHOOK && env.COMMIT_HASH) {
    new Discord(env.DISCORD_WEBHOOK, env.COMMIT_HASH).init();
  } else {
    console.log("🔴 Discord webhook has not been setup yet.");
  }
}
