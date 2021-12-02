import { Client, Guild } from "discord.js";

export default (client: Client) => {
  const channelId = "915937247470166046";

  const setMemberCount = (guild: Guild) => {
    const channel = guild.channels.cache.get(channelId);
    channel?.setName(`Members: ${guild.memberCount.toLocaleString()}`);
  };

  client.on("guildMemberAdd", (member) => {
    setMemberCount(member.guild);
  });

  client.on("guildMemberRemove", (member) => {
    setMemberCount(member.guild);
  });

  const guild = client.guilds.cache.get("750218825680551987")!;
  setMemberCount(guild);
};
