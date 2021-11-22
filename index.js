const DiscordJS = require("discord.js");
const Intents = require("discord.js").Intents;
const dotenv = require("dotenv");
dotenv.config();

const userCommands = require("./src/userCommands");
const interaction = require("./src/interaction");

const client = new DiscordJS.Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot is ready to roll");

  // FIXME:
  // commands(client, "ping", (message) => {
  //   message.reply({
  //     content: "pong",
  //     ephemeral: true,
  //   });
  // });

  userCommands(client);

  interaction(client, (commands) => {
    // console.log(commands.guild);
  });
});

// FIXME:
// const client = new DiscordJS.Client({
//   intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
// });

// client.on("ready", () => {
//   console.log("Bot is ready to roll!!");

//   // Only for a single guild/server
//   const guildId = "750218825680551987";
//   const guild = client.guilds.cache.get(guildId);
//   let commands;

//   if (guild) {
//     commands = guild.commands;
//   } else {
//     commands = client.application?.commands;
//   }

//   /*
//     Creating new command
//     These slash commands are listen to default discord commands like /tenor, /giphy
//   */
//   commands?.create({
//     name: "ping",
//     description: "Replies with pong",
//   });

//   commands?.create({
//     name: "add",
//     description: "Add two numbers",
//     options: [
//       {
//         name: "number1",
//         description: "First number",
//         required: true,
//         type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
//       },
//       {
//         name: "number2",
//         description: "Second number",
//         required: true,
//         type: DiscordJS.Constants.ApplicationCommandOptionTypes.NUMBER,
//       },
//     ],
//   });
// });

// // Listening to user interaction event
// client.on("interactionCreate", async (interation) => {
//   if (!interation.isCommand()) {
//     return;
//   }

//   if (interation.commandName === "ping") {
//     interation.reply({
//       content: "pong",
//       ephemeral: true,
//     });
//   } else if (interation.commandName === "add") {
//     const num1 = interation.options.getNumber("number1")!;
//     const num2 = interation.options.getNumber("number2")!;

//     await interation.deferReply({
//       ephemeral: true,
//     });

//     await new Promise((resolve) => setTimeout(resolve, 5000));

//     interation.editReply({
//       content: `${num1} + ${num2} = ${num1 + num2}`,
//     });
//   }
// });

// On message creation event
// client.on("messageCreate", (message) => {
//   if (message.content.toLowerCase() === "ping") {
//     message.reply({
//       content: "pong",
//     });
//   }
// });

client.login(process.env.TOKEN);
