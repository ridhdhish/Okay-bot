import { Message } from "discord.js";
import redis from "../redis";

export default (message: Message) => {
  // !mute <@> duration durationType

  if (!message.member?.permissions.has("ADMINISTRATOR")) {
    message.channel.send("You don't have to mute anyone!!");
    return;
  }

  const syntax = "!mute <@> <duration in number> <m, h, d, or life>";
  const durations: any = {
    m: 60,
    h: 60 * 60,
    d: 60 * 60 * 24,
    life: -1,
  };

  const { member, content, mentions, channel } = message;

  const splitData = content.trim().split(" ");

  if (splitData.length !== 4) {
    channel.send("Please provide valid syntax to mute any user. " + syntax);
    return;
  }

  if (!mentions.users.first()) {
    channel.send("Please mention any member to mute. " + syntax);
    return;
  }

  const duration = parseInt(splitData[2]);
  const durationType = splitData[3];

  if (isNaN(duration)) {
    channel.send("Please provide vaid duration. " + syntax);
    return;
  }

  if (!durations[durationType]) {
    channel.send(
      "Please use valid duration type as showed in syntax. " + syntax
    );
    return;
  }

  console.log(splitData);
};
