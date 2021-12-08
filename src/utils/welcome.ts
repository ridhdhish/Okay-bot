import { GuildMember } from "discord.js";

export default (member: GuildMember, cache: any) => {
  const targetChannel = "914087983550959687";
  const welcomeChannel = cache[0];

  const message = `${cache[1]} <@${
    member.id
  }>. Please checkout ${member.guild.channels.cache
    .get(targetChannel)
    ?.toString()}`;

  const channel: any = member.guild.channels.cache.get(welcomeChannel)!;
  channel.send(message);
};
