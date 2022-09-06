import { Router } from "express";
import { User } from "../models/user.model";
import { Post } from "../models/post.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../utils/config.utils";

const router = Router();

// sign up a user
router.post("/signup", async (req, res) => {
  try {
    // verify that no user with the same email exist
    let user = await User.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with the same email already exist");

    // create the user instance
    user = new User(req.body);
    // hash the password
    user.password = bcrypt.hashSync(req.body.password, 10);
    // save the user to database
    await user.save();
    // return only vital info
    res.send({ id: user.id, name: user.name });
  } catch (error) {
    res.send(error);
  }
});

// login
router.post("/login", async (req, res) => {
  if (!req.body.email || !req.body.password)
    return res.status(400).send("All fields are required");
  try {
    // get the user with the same email
    const user = await User.findOne({ email: req.body.email });
    // if email is not found in db, throw error
    if (!user)
      return res
        .status(403)
        .send("You are not registered. Continue with signup");
    // check if the password entered by user is the same as the hashedpassword in db
    const isMatch = bcrypt.compareSync(req.body.password, user.password);
    if (!isMatch) return res.status(403).send("Invalid email or password");
    // after that allow the user in by issuing a token
    const token = jwt.sign({ id: user.id }, config.SECRET);

    // return the user details or token
    res.send(token);
  } catch (error) {
    res.send(error);
  }
});

// get all users
router.get("/", async (_, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

// get a users
router.get("/single/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ author: user.id });
    user.posts = posts;
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// update a user
router.put("/", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) return res.status(404).send("user not found");
    Object.assign(user, req.body);

    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// delete a user
router.delete("/delete", async (req, res) => {
  try {
    const user = await User.findById(req.body.id);
    if (!user) return res.status(404).send("User not found");
    user.remove();
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});

// delete all users
router.delete("/all", async (_, res) => {
  try {
    const users = await User.find();
    for (const user of users) {
      user.remove();
    }
    res.send(users);
  } catch (error) {
    res.send(error);
  }
});

export { router as UserRouter };
