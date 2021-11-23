import { Client, Message } from "discord.js";

import commands from "./utils/commands";

export default (client: Client) => {
  // Command that replay with PONG
  commands(client, "ping", (message: Message) => {
    message.reply({
      content: "pong",
      tts: true,
    });
  });

  // Displays server details
  // commands(client, ["cc", "clearMessages"], (message) => {});
};
