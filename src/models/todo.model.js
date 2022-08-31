import mongoose, { Schema } from "mongoose";

const TodoModel = new Schema({
  task: String,
});

export const Todo = mongoose.model("Todo", TodoModel);
