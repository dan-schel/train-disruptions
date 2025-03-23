import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Channel,
  Client,
  Events,
  GatewayIntentBits,
  GuildMember,
  Routes,
  spoiler,
} from "discord.js";

export class DiscordBot {
  private client: Client;

  constructor(
    private readonly token: string,
    private readonly channel: string,
  ) {
    this.client = new Client({
      intents: [GatewayIntentBits.GuildMembers],
    });

    this._init();
  }

  private _init() {
    this.client.on(Events.InteractionCreate, async (readyClient) => {
      if (readyClient.isButton()) {
        // Handle the event to delete the message containing login credentials
        if (readyClient.customId === "delete_credentials") {
          try {
            await readyClient.client.rest.delete(
              Routes.channelMessage(
                readyClient.channelId,
                readyClient.message.id,
              ),
            );
          } catch (error) {
            console.warn("Failed to delete message");
            console.warn(error);
          }
        }
      }
    });

    this.client.login(this.token);
  }

  async getMembers() {
    const members = (await this.client.rest.get(
      Routes.guildMembers(this.channel),
      { query: new URLSearchParams({ limit: "10" }) },
    )) as GuildMember[];

    return members
      .filter((member) => !member.user.bot)
      .map((member) => member.user);
  }

  async inviteMember(
    id: string,
    username: string,
    password: string,
    origin: string,
  ) {
    const DM = (await this.client.rest.post(Routes.userChannels(), {
      body: { recipient_id: id },
    })) as Channel;

    const linkButton = new ButtonBuilder()
      .setStyle(ButtonStyle.Link)
      .setURL(`${origin}/admin`)
      .setLabel("Login");
    const deleteButton = new ButtonBuilder()
      .setCustomId("delete_credentials")
      .setLabel("Delete Message")
      .setStyle(ButtonStyle.Danger);
    const actions = new ActionRowBuilder<ButtonBuilder>().addComponents(
      linkButton,
      deleteButton,
    );

    await this.client.rest.post(Routes.channelMessages(DM.id), {
      body: {
        content:
          `You've been made an admin for Is is buses?! Below are your credentials :point_down:\n` +
          spoiler(`Username: ${username}\n` + `Password: ${password}`),
        components: [actions.toJSON()],
      },
    });
  }
}
