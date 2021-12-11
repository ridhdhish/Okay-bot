import { Client, GuildMember, Message } from "discord.js";
import redis, { expire } from "../redis";

const redisPrefix = "mute-";

const assignRole = (member: GuildMember) => {
  const role = member.guild.roles.cache.find((role) => role.name === "Muted");
  if (role) {
    member.roles.add(role);
    console.log("Muted: ", member.id);
  }
};

export const muteUser = async (member: GuildMember) => {
  const redisClient: any = await redis();

  try {
    const data = await redisClient.get(`${redisPrefix}${member.id}`);

    if (data) {
      assignRole(member);
    }
  } finally {
    redisClient.quit();
  }
};

export default async (client: Client, message: Message) => {
  // !mute <@> duration durationType

  expire((message: any) => {
    console.log(message);
  });

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
  const guild = message.guild!;

  const splitData = content.trim().split(/\s+/);

  if (splitData.length !== 4) {
    channel.send("Please provide valid syntax to mute any user. " + syntax);
    return;
  }

  if (!mentions.users.first()) {
    channel.send("Please tag any member to mute. " + syntax);
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

  const user = mentions.users.first()!;
  const targetMember = guild.members.cache.get(user.id)!;

  assignRole(targetMember);

  const seconds = duration * durations[durationType];

  const redisClient: any = await redis();
  try {
    if (seconds > 0) {
      await redisClient.set(`${redisPrefix}${user.id}`, "true", {
        EX: 3,
      });
    } else {
      await redisClient.set(`${redisPrefix}${user.id}`, "true");
    }
  } catch (err) {
    console.log(err);
  } finally {
    redisClient.quit();
  }
};
