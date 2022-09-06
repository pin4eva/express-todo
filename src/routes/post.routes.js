import express from "express";
import { Post } from "../models/post.model";
import { User } from "../models/user.model";
const router = express.Router();

// create Post
router.post("/", async (req, res) => {
  try {
    const post = new Post(req.body);
    const author = await User.findById(req.body.author);
    if (!author) return res.status(400).send("Invalid author ID");
    post.author = author;
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
    const post = await Post.findOne({ id: req.params.id }).populate("author");
    if (!post) return res.status(404).json(post);
    return res.send(post);
  } catch (error) {
    res.send(error);
  }
});
// Delete a Post
router.delete("/delete", async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    if (!post) return res.status(404).send("Invalid Post ID");

    post.remove();

    res.send(post);
  } catch (error) {
    res.send(error);
  }
});

// delete all posts
router.delete("/delete/all", async (_, res) => {
  try {
    const posts = await Post.find();
    for (const post of posts) {
      post.remove();
    }
    res.send(posts);
  } catch (error) {
    res.send(error);
  }
});
export { router as PostRouter };
