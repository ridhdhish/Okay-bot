import DiscordJS, { Client, Message, Permissions } from "discord.js";

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
          message.channel.bulkDelete(results);
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

  // Craete text channel
  commands(client, "createvoicechannel", (message: Message) => {
    const channelName = message.content.replace("!createvoicechannel ", "");

    message.guild?.channels
      .create(channelName, {
        type: "GUILD_VOICE",
      })
      .then((channel) => {
        const channelCatagoryId = "750218825680551990";
        channel.setParent(channelCatagoryId);
        channel.setUserLimit(8);
      });
  });

  // Create text channel
  commands(client, "createtextchannel", (message: Message) => {
    const channelName = message.content.replace("!createtextchannel ", "");

    message.guild?.channels
      .create(channelName, {
        type: "GUILD_TEXT",
      })
      .then((channel) => {
        const catagoryId = "750218825680551989";
        channel.setParent(catagoryId);
      });
  });

  // Demo Embed
  // TODO: Reddit meme with embeds.
  commands(client, "embed", (message: Message) => {
    const author = message.author.username;
    const embedMessage = new DiscordJS.MessageEmbed();

    embedMessage
      .setAuthor(author)
      .setDescription("Captain of 12th Division. Founder of research center.")
      .setURL(
        "https://static.wikia.nocookie.net/disneythehunchbackofnotredame/images/f/f0/Bleach_213-006.jpg/revision/latest?cb=20140719221339"
      )
      .setTitle("Mr. Kisuke Urahara")
      .setImage(
        "https://static.wikia.nocookie.net/disneythehunchbackofnotredame/images/f/f0/Bleach_213-006.jpg/revision/latest?cb=20140719221339"
      );

    message.channel.send({
      embeds: [embedMessage],
    });
  });

  // Server Info
  commands(client, "serverinfo", async (message: Message) => {
    const guild = message.guild!;
    const guildOwner = await guild?.fetchOwner();

    const owner = guildOwner.user.username;
    const icon = guild.iconURL()!;
    const name = guild.name;
    const memberCount = guild.memberCount;

    const embedMessage = new DiscordJS.MessageEmbed();

    embedMessage
      .setTitle("Server Info")
      .setThumbnail(icon)
      .setFields([
        { name: "Server Name", value: name },
        { name: "Owner", value: owner },
        { name: "Member Count", value: `${memberCount}` },
      ]);

    message.channel.send({
      embeds: [embedMessage],
    });
  });
};
