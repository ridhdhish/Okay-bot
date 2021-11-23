import { Client } from "discord.js";

const prifix = "!";

export default (client: Client, alias: string, callback: any) => {
  client.on("messageCreate", (message) => {
    if (message.content.startsWith(`${prifix}${alias}`)) {
      callback(message);
    }
  });
};
