import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import mongo from "./src/mongo";

import { prefix } from "./src/utils/commands";

import userCommands from "./src/userCommands";
import interactions from "./src/interactions";
import firstMessage from "./src/utils/first-message";
import privateMessage from "./src/utils/privateMessage";
import role from "./src/utils/role";
import welocome from "./src/utils/welocome";
import memberCount from "./src/utils/member-count";

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.on("ready", async () => {
  console.log("Bot is ready to roll");

  await mongo().then((mongoose) => {
    try {
    } catch (err) {
      console.log(err);
    } finally {
      // Close the connection
      mongoose.connection.close();
    }
  });

  client.user?.setPresence({
    activities: [
      {
        name: `${prefix}help`,
        type: "LISTENING",
      },
    ],
  });

  privateMessage(client);
  role(client);
  welocome(client);
  memberCount(client);

  // firstMessage(client, "914087983550959687", "Welcome my gorgeous friends!!", [
  //   "🍟",
  //   "🍔",
  //   "🥪",
  // ]);

  // FIXME: Solve error first
  interactions(client, (commands: any) => {
    // console.log(commands.guild);
  });
});

client.on("messageCreate", (message) => {
  if (message.content.startsWith(`${prefix}`)) {
    const commandMessage = message.content.split(" ");
    userCommands(client, message, commandMessage[0]);
  }
});

client.login(process.env.TOKEN);
