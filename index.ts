import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import userCommands from "./src/userCommands";
import interactions from "./src/interactions";
import firstMessage from "./src/utils/first-message";
import privateMessage from "./src/utils/privateMessage";

const client = new DiscordJS.Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
});

client.on("ready", () => {
  console.log("Bot is ready to roll");

  userCommands(client);
  privateMessage(client);

  firstMessage(client, "914087983550959687", "Welcome my gorgeous friends!!", [
    "🍟",
    "🍔",
    "🥪",
  ]);

  // FIXME: Solve error first
  interactions(client, (commands: any) => {
    // console.log(commands.guild);
  });
});

client.login(process.env.TOKEN);
