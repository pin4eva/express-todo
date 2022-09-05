import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
    author: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
