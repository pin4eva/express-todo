import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const db = await mongoose.connect("mongodb://localhost/express-todo");
    console.log(`Mongodb connected to ${db.connection.host}`);
    return db;
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
