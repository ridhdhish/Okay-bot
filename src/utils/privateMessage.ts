import { Client } from "discord.js";

export default (client: Client) => {
  const badWords = ["bc", "fuck", "suck", "dick"];
  client.on("messageCreate", (message) => {
    const words = message.content.split(" ");

    for (const word of words) {
      if (badWords.includes(word)) {
        message.author.send(`Warning!! Bad Word: ${word}`);
        break;
      }
    }
  });
};
