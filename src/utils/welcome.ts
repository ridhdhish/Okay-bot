import { Client, GuildChannel, TextChannel } from "discord.js";
import welcomeSchema from "../Schemas/welcome-schema";

export default (client: Client) => {
  client.on("guildMemberAdd", async (member) => {
    const guildId = member.guild.id;
    const data = await welcomeSchema.findById(guildId);

    const targetChannel = "914087983550959687";
    const welcomeChannel = data.channelId;

    const message = `${data.text} <@${
      member.id
    }>. Please checkout ${member.guild.channels.cache
      .get(targetChannel)
      ?.toString()}`;

    const channel: any = member.guild.channels.cache.get(welcomeChannel)!;
    channel.send(message);
  });
};
