import { Client, GuildChannel, TextChannel } from "discord.js";
import welcomeSchema from "../Schemas/welcome-schema";

export default (client: Client) => {
  // FIXME: Displaying multiple welcome messages and also sends message in multiple channels
  client.on("guildMemberAdd", async (member) => {
    const guildId = member.guild.id;
    const data = await welcomeSchema.findById(guildId);

    const targetChannel = "914087983550959687";
    const welcomeChannel = data.channelId;

    const message = `Welocome <@${
      member.id
    }>. Please checkout ${member.guild.channels.cache
      .get(targetChannel)
      ?.toString()}`;

    const channel: any = member.guild.channels.cache.get(welcomeChannel)!;
    channel.send(message);
  });
};
