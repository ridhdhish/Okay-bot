import mongoose from "mongoose";

const messageCountSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  messageCount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("message-count", messageCountSchema);
