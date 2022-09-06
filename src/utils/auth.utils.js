import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { config } from "./config.utils";

export const authGuard = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) return res.status(403).send("Unauthorized access");
  const token = authorization.split(" ")[1];

  const payload = jwt.verify(token, config.SECRET);
  if (!payload.id) return res.status(403).send("Invalid access token");

  const user = await User.findById(payload.id).select("-password");
  if (!user) return res.status(403).send("Unauthorized user");
  req.user = user;

  next();
};
