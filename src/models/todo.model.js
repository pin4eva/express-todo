import mongoose, { Schema } from "mongoose";

const TodoModel = new Schema({
  task: { type: String },
  completed: { type: Boolean, default: false },
});

export const Todo = mongoose.model("Todo", TodoModel);
