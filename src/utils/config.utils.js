import dotenv from "dotenv";
dotenv.config();

export const config = {
  SECRET: process.env.SECRET,
  MONGO_URI: process.env.MONGO_URI,
};
