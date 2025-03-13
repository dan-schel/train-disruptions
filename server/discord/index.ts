import { EmbedBuilder, hyperlink, inlineCode, WebhookClient } from "discord.js";

export class Discord {
  private webhookClient: WebhookClient;

  constructor(
    url: string,
    private hash: string,
  ) {
    this.webhookClient = new WebhookClient({
      url,
    });
  }

  async init() {
    await this._sendMessage();
  }

  private async _sendMessage() {
    try {
      await this.webhookClient.send({
        embeds: [this._buildMessage()],
      });
    } catch {
      console.log(`🔴 Failed to send message to Discord`);
    }
  }

  private _buildMessage() {
    return new EmbedBuilder()
      .setTitle("Deployment Successful!")
      .setColor("Green")
      .setDescription(`**Is it buses?** deployed successfully.`)
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
