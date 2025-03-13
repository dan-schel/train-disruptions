import { EmbedBuilder, hyperlink, inlineCode, WebhookClient } from "discord.js";

export class DiscordClient {
  private webhookClient: WebhookClient;

  constructor(
    url: string,
    private hash: string,
  ) {
    this.webhookClient = new WebhookClient({
      url,
    });
  }

  async sendMessage(previouslyDeployed: boolean): Promise<void> {
    try {
      await this.webhookClient.send({
        embeds: [this._buildMessage(previouslyDeployed)],
      });
    } catch (error) {
      console.warn(`🔴 Failed to send message to Discord`);
      console.warn(error);
    }
  }

  private _buildMessage(previouslyDeployed: boolean) {
    return new EmbedBuilder()
      .setTitle("Deployment Successful!")
      .setColor(previouslyDeployed ? "Orange" : "Green")
      .setDescription(
        `**Is it buses?** deployed ${previouslyDeployed ? "using an existing commit" : "successfully"}.`,
      )
      .addFields([
        {
          name: "Commit Hash",
          value: hyperlink(
            inlineCode(this.hash),
            `https://github.com/dan-schel/train-disruptions/commit/${this.hash}`,
          ),
        },
      ])
      .setTimestamp();
  }
}
