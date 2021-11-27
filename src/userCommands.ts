import { Client, Message, Permissions } from "discord.js";

import commands from "./utils/commands";

export default (client: Client) => {
  // Command that replay with PONG
  commands(client, "ping", (message: Message) => {
    message.reply({
      content: "pong",
      tts: true,
    });
  });

  // Displays server details
  commands(client, "servers", (message: Message) => {
    client.guilds.cache.forEach((guild) => {
      message.reply({
        content: `${guild.name} has ${guild.memberCount} members.`,
      });
    });
  });

  // Delete channel messages
  // This can only delete messages under 14 days older
  commands(client, "cc", (message: any) => {
    if (message.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      if (message.channel.type === "GUILD_TEXT") {
        message.channel.messages.fetch().then((results: any) => {
          console.log(message.channel.bulkDelete(results));
        });
      }
    }
  });

  // Set the status of the bot
  commands(client, "status", (message: Message) => {
    const content = message.content.replace("!status", "");
    client.user?.setPresence({
      activities: [
        {
          name: content,
          type: "LISTENING",
        },
      ],
      status: "online",
    });
  });
};
