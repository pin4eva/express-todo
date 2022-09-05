import express from "express";
import { Post } from "../models/post.model";
const router = express.Router();

// create Post
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);

    await post.save();

    res.send(post);
  } catch (error) {
    res.json(error);
  }
});

// Update Post
router.put("/", async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    if (!post) return res.status(404).send("Invalid Post ID");
    const body = req.body;

    Object.assign(post, body);

    await post.save();
    return res.send(post);
  } catch (error) {
    res.send(error);
  }
});

// Get All Post
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
});

// Get a Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findOne({ id: req.params.id });
    if (!post) return res.status(404).json(post);
    return res.send(post);
  } catch (error) {
    res.send(error);
  }
});
// Delete a Post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Invalid Post ID");

    post.remove();

    res.send(post);
  } catch (error) {
    res.send(error);
  }
});

export { router as PostRouter };
