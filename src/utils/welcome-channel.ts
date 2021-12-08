import { Client, Message } from "discord.js";
import { Mongoose } from "mongoose";

import welcomeSchema from "../Schemas/welcome-schema";
import commands from "./commands";
import welcome from "./welcome";

export default (client: Client, mongoose: Mongoose) => {
  let cache: any = {};

  commands(client, "setWelcome", async (message: Message) => {
    const member = message.member;
    const guild = message.guild!;
    const channel = message.channel;
    const content = message.content;

    let text = content.replace("!setWelcome", "");
    console.log(text);
    if (!text) {
      text = "WELCOME THIS AMAZING SERVER ✨✨";
    }

    cache[guild.id] = [channel.id, text];

    if (!member?.permissions.has("ADMINISTRATOR")) {
      channel.send("Fuck you! You don't have permission.. 🖕");
      return;
    }

    console.log(guild.id);

    await welcomeSchema.findOneAndUpdate(
      { _id: guild.id },
      {
        _id: guild.id,
        channelId: channel.id,
        text,
      },
      { upsert: true }
    );
  });

  // On member add displays welocme message
  client.on("guildMemberAdd", async (member) => {
    const guild = member.guild;
    if (!cache[guild.id]) {
      const data = await welcomeSchema.findById(guild.id);
      cache[guild.id] = [data.channelId, data.text];
    }

    welcome(member, cache[guild.id]);
  });
};
