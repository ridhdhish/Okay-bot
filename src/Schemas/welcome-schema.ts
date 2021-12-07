import mongoose from "mongoose";

const requiredObject = {
  type: String,
  required: true,
};

const welcomeSchema = new mongoose.Schema({
  _id: requiredObject,
  channelId: requiredObject,
  text: requiredObject,
});

export default mongoose.model("Welcome", welcomeSchema);
