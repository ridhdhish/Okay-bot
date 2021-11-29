import { Client } from "discord.js";

export const prefix = "!";

export default (client: Client, alias: string, callback: any) => {
  client.on("messageCreate", (message) => {
    if (message.content.startsWith(`${prefix}${alias}`)) {
      callback(message);
    }
  });
};
