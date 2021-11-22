module.exports = (client, callback) => {
  const guildId = "750218825680551987";
  const guild = client.guilds.cache.get(guildId);
  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  commands.create({
    name: "ping",
    description: "Reply with pong.",
  });

  client.on("interactionCreate", (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    if (interaction.commandName === "ping") {
      interaction.reply({
        content: "pong",
        ephemeral: true,
      });
    }
  });

  callback(commands);
};
