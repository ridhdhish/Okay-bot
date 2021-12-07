import mongoose from "mongoose";

export default async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/okayBot");
  console.log("Connected to MongoDB.");
  return mongoose;
};
