import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: String,
    body: String,
  },
  { timestamps: true }
);

export const Post = mongoose.model("Post", PostSchema);
