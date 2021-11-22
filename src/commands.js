const prifix = "!";

module.exports = (client, alias, callback) => {
  client.on("messageCreate", (message) => {
    if (message.content.startsWith(`${prifix}${alias}`)) {
      callback(message);
    }
  });
};
