import {
  Client,
  GuildMember,
  MessageReaction,
  PartialMessageReaction,
  PartialUser,
  User,
} from "discord.js";
import firstMessage from "./first-message";

export default (client: Client) => {
  const getEmoji = (emojiName: string) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const channelId = "914087983550959687";

  type troles = {
    [key: string]: string;
  };

  const roles: troles = {
    javascript: "JavaScript",
    python: "Python",
  };

  let reactions = [];
  let reactionMessage = "React to claim roles.\n";

  for (const key in roles) {
    const emoji = getEmoji(key)!;
    reactions.push(`${emoji}`);

    const roleName = roles[key];

    reactionMessage += `<:${emoji.name}:${emoji.id}> = ${roleName}\n`;
  }

  firstMessage(client, channelId, reactionMessage, reactions);

  const handleReaction = (
    reaction: MessageReaction | PartialMessageReaction,
    user: User | PartialUser,
    isAdding: Boolean
  ) => {
    if (user.id === "910475500995084298") {
      return;
    }

    const emoji = reaction.emoji.name!;
    const guild = reaction.message.guild!;

    const roleName = roles[emoji];
    if (!roleName) {
      return;
    }

    const role = guild.roles.cache.find((role: any) => role.name === roleName)!;
    const member: GuildMember = guild.members.cache.find(
      (member: any) => member.id === user.id
    )!;

    if (isAdding) {
      member?.roles.add(role);
    } else {
      member?.roles.remove(role);
    }
  };

  client.on("messageReactionAdd", (reaction, user) => {
    if (reaction.message.channel.id === channelId)
      handleReaction(reaction, user, true);
  });

  client.on("messageReactionRemove", (reaction, user) => {
    if (reaction.message.channel.id === channelId)
      handleReaction(reaction, user, false);
  });
};
