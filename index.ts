import discordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new discordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot is ready to roll!!");
});

client.on("messageCreate", (message) => {
  if (message.content.toLowerCase() === "ping") {
    message.reply({
      content: "pong",
    });
  }
});

client.login(process.env.TOKEN);
