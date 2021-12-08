import { Client, Message } from "discord.js";
import { Mongoose } from "mongoose";

import welcomeSchema from "../Schemas/welcome-schema";
import commands from "./commands";
import welcome from "./welcome";

export default (client: Client, mongoose: Mongoose) => {
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

    console.log(text);

    if (!member?.permissions.has("ADMINISTRATOR")) {
      channel.send("Fuck you! You don't have permission.. 🖕");
      return;
    }

    await welcomeSchema.findOneAndUpdate(
      { _id: guild.id },
      {
        _id: guild?.id,
        channelId: channel.id,
        text,
      },
      { upsert: true }
    );
  });

  welcome(client);
};
