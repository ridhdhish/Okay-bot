const commands = require("./utils/commands");

module.exports = (client) => {
  commands(client, "ping", (message) => {
    message.reply({
      content: "pong",
      ephemeral: true,
    });
  });
};
