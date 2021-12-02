import { Client, GuildChannel, TextChannel } from "discord.js";

export default (client: Client) => {
  client.on("guildMemberAdd", (member) => {
    const targetChannel = "914087983550959687";
    const welcomeChannel = "915933592952115200";

    const message = `Welocome <@${
      member.id
    }>. Please checkout ${member.guild.channels.cache
      .get(targetChannel)
      ?.toString()}`;

    const channel: any = member.guild.channels.cache.get(welcomeChannel)!;
    channel.send(message);
  });
};
