import { Message } from "discord.js";
import messageCountSchema from "../Schemas/message-count-schema";

export default async (message: Message) => {
  const author = message.author;

  // FIXME: not creating new record and also not updating it.

  const data = await messageCountSchema.findOneAndUpdate(
    { _id: author.id },
    {
      _id: author.id,
      $inc: {
        messageCount: 1,
      },
    },
    {
      upsert: true,
    }
  );
};
