import { Message, MessagePayload } from "discord.js";

export default async (message: Message) => {
  const addReaction = async (message: Message) => {
    await message.react("👍");
    await message.react("👎");
  };

  await message.delete();

  const fetchedMessage = await message.channel.messages.fetch({
    limit: 1,
  });
  const firstMessage: Message = fetchedMessage.first()!;

  if (fetchedMessage && firstMessage) {
    addReaction(firstMessage);
  }
};
