import { Channel, Client, Message } from "discord.js";

const addReaction = async (message: Message, reactions: Array<string>) => {
  for (const reaction of reactions) {
    await message.react(reaction);
  }
};

export default async (
  client: Client,
  id: string,
  text: string,
  reactions: Array<string>
) => {
  const channel: any = await client.channels.fetch(id);

  channel.messages.fetch().then((messages: any) => {
    if (messages.size === 0) {
      // send new message
      channel.send(text).then((message: Message) => {
        // Add reaction here
        addReaction(message, reactions);
      });
    } else {
      // edit message
      const message: any = Array.from(messages.values()).pop();
      message.edit(text);
      message.reactions.removeAll();
      addReaction(message, reactions);
    }
  });
};
