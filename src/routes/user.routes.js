import { Router } from "express";
import { User } from "../models/user.model";

const router = Router();

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
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");
    res.send(user);
  } catch (error) {
    res.send(error);
  }
});
// create a user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
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

export { router as UserRouter };
