const { Schema, model, default: mongoose } = require("mongoose");

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  posts: { type: [{ type: mongoose.Types.ObjectId, ref: "Post" }] },
});

export const User = model("User", UserSchema);
