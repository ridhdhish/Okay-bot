import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

import userCommands from "./src/userCommands";
import interactions from "./src/interactions";

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

  // FIXME: Solve error first
  interactions(client, (commands: any) => {
    // console.log(commands.guild);
  });
});

client.login(process.env.TOKEN);
