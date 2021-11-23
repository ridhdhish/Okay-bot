import { Client, Constants, GuildApplicationCommandManager } from "discord.js";

export default (client: Client, callback: Function) => {
  const guildId = "750218825680551987";
  const guild = client.guilds.cache.get(guildId);
  let commands: GuildApplicationCommandManager | undefined;

  commands = guild?.commands;

  // if (guild) {
  //   commands = guild.commands;
  // } else {
  //   commands = client.application?.commands || null;
  // }

  // Pinging
  commands?.create({
    name: "ping",
    description: "Reply with pong.",
  });

  // Addition command
  commands?.create({
    name: "add",
    description: "Add two numbers",
    options: [
      {
        name: "number1",
        description: "First Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "number2",
        description: "Second Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });

  // Subtract command
  commands?.create({
    name: "sub",
    description: "Subtract two numbers",
    options: [
      {
        name: "number1",
        description: "First Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "number2",
        description: "Second Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });

  // Multiplication command
  commands?.create({
    name: "mul",
    description: "Multiply two numbers",
    options: [
      {
        name: "number1",
        description: "First Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "number2",
        description: "Second Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });

  // Division command
  commands?.create({
    name: "div",
    description: "Divide two numbers",
    options: [
      {
        name: "number1",
        description: "First Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
      {
        name: "number2",
        description: "Second Number",
        type: Constants.ApplicationCommandOptionTypes.NUMBER,
      },
    ],
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
      return;
    }

    if (interaction.commandName === "ping") {
      interaction.reply({
        content: "pong",
        ephemeral: true,
      });
    } else if (interaction.commandName === "add") {
      const num1 = interaction.options.getNumber("number1")!;
      const num2 = interaction.options.getNumber("number2")!;

      await interaction.deferReply({
        ephemeral: true,
      });

      interaction.editReply({
        content: `${num1} + ${num2} = ${num1 + num2}`,
      });
    } else if (interaction.commandName === "sub") {
      const num1 = interaction.options.getNumber("number1")!;
      const num2 = interaction.options.getNumber("number2")!;

      await interaction.deferReply({
        ephemeral: true,
      });

      interaction.editReply({
        content: `${num1} - ${num2} = ${num1 - num2}`,
      });
    } else if (interaction.commandName === "mul") {
      const num1 = interaction.options.getNumber("number1")!;
      const num2 = interaction.options.getNumber("number2")!;

      await interaction.deferReply({
        ephemeral: true,
      });

      interaction.editReply({
        content: `${num1} * ${num2} = ${num1 * num2}`,
      });
    } else if (interaction.commandName === "div") {
      const num1 = interaction.options.getNumber("number1")!;
      const num2 = interaction.options.getNumber("number2")!;

      await interaction.deferReply({
        ephemeral: true,
      });

      interaction.editReply({
        content: `${num1} / ${num2} = ${num1 / num2}`,
      });
    }
  });

  callback(commands);
};
