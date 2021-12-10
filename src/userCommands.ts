import DiscordJS, { Client, Message, Permissions } from "discord.js";

import commands, { prefix } from "./utils/commands";
import { ban, kick } from "./utils/kick-ban";
import poll from "./utils/poll";

export default async (client: Client, message: Message, command: string) => {
  if (command === `${prefix}ping`) {
    // Command that replay with PONG
    message.reply({
      content: "pong",
      tts: true,
    });
  } else if (command === `${prefix}servers`) {
    // Displays server details
    client.guilds.cache.forEach((guild) => {
      message.reply({
        content: `${guild.name} has ${guild.memberCount} members.`,
      });
    });
  } else if (command === `${prefix}cc`) {
    // Delete channel messages
    // This can only delete messages under 14 days older
    const _message: any = message;
    if (_message.member?.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) {
      if (_message.channel.type === "GUILD_TEXT") {
        _message.channel.messages.fetch().then((results: any) => {
          _message.channel.bulkDelete(results);
        });
      }
    }
  } else if (command === `${prefix}status`) {
    // Set the status of the bot
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
  } else if (command === `${prefix}createvoicechannel`) {
    // Craete voice channel
    const channelName = message.content.replace("!createvoicechannel ", "");

    message.guild?.channels
      .create(channelName, {
        type: "GUILD_VOICE",
      })
      .then((channel: any) => {
        const channelCatagoryId = "750218825680551990";
        channel.setParent(channelCatagoryId);
        channel.setUserLimit(8);
      });
  } else if (command === `${prefix}createtextchannel`) {
    // Craete text channel
    const channelName = message.content.replace("!createtextchannel ", "");

    message.guild?.channels
      .create(channelName, {
        type: "GUILD_TEXT",
      })
      .then((channel: any) => {
        const catagoryId = "750218825680551989";
        channel.setParent(catagoryId);
      });
  } else if (command === `${prefix}embed`) {
    // Demo Embed
    // TODO: Reddit meme with embeds.
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
  } else if (command === `${prefix}serverinfo`) {
    // Server Info
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
  } else if (command === `${prefix}help`) {
    // Display all commands
    const embedMessage = new DiscordJS.MessageEmbed();
    embedMessage
      .setDescription(
        `
    **!help** - Display all accessible commands
    **!add** <num1> <num2> - Addition of two numbers
    **!sub** <num1> <num2> - Subtraction of two numbers
    **!mul** <num1> <num2> - Multiplication of two numbers
    **!div** <num1> <num2> - Division of two numbers
    **!servers** - Displays all server details
    **!serverinfo** - Displays server details you are in
    **!createtextchannel <name>** - Creates new text channel
    **!createvoicechannel <name>** - Creates new voice channel
    **!status <status>** - Set new status of bot.
    **!cc** - Clear recent messages of perticular text channel
    **!ping** - Reply with pong 
    `
      )
      .setColor("BLUE");

    message.channel.send({
      embeds: [embedMessage],
    });
  } else if (command === `${prefix}ban`) {
    // Ban someone useless
    ban(client, message);
  } else if (command === `${prefix}kick`) {
    // kick someone useless
    kick(client, message);
  } else if (command === `${prefix}poll`) {
    poll(message);
  } else {
    // console.log("Nothing");
  }
};
