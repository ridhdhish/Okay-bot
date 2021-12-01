import { Client, Message } from "discord.js";

export const ban = (client: Client, message: Message) => {
  const member = message.member;
  const mentions = message.mentions;

  if (member?.permissions.has("BAN_MEMBERS")) {
    const banUser = mentions.users.first();

    if (banUser) {
      const guildMember = message.guild?.members.cache.get(banUser.id);
      guildMember?.ban();
      message.channel.send(`Jayda backchodi na kare.`);
    } else {
      message.channel.send(
        `<@${member?.id}> Atleast mention someone you fucking idiot`
      );
    }
  } else {
    message.channel.send(
      `<@${member?.id}> You Fucking Bitch. You don't have permission to ban.`
    );
  }
};

export const kick = (client: Client, message: Message) => {
  const member = message.member;
  const mentions = message.mentions;

  if (member?.permissions.has("BAN_MEMBERS")) {
    const kickUser = mentions.users.first();

    if (kickUser) {
      const guildMember = message.guild?.members.cache.get(kickUser.id);
      guildMember?.kick();
      message.channel.send(`Baap se backchodi bc.`);
    } else {
      message.channel.send(
        `<@${member?.id}> Atleast mention someone you fucking idiot`
      );
    }
  } else {
    message.channel.send(`<@${member?.id}> Baap ko kick nhi kar sakte.`);
  }
};
