import { Router } from "express";
import { Todo } from "../models/todo.model";

const router = Router();

// get all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.send(todos);
  } catch (error) {
    res.json(error);
  }
});
router.get("/completed", async (req, res) => {
  try {
    const todo = await Todo.find({ completed: true });

    res.send(todo);
  } catch (error) {
    res.json(error);
  }
});

// get todo by id
router.get("/single/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.send("Todo not found");
    res.send(todo);
  } catch (error) {
    res.json(error);
  }
});

// create todo
router.post("/", async (req, res) => {
  // throw error if task is not provided
  if (!req.body.task) return res.status(400).send("Field task is required");
  try {
    const task = req.body.task;
    // check if a task with the same value already exist
    const isTask = await Todo.findOne({ task });

    // if so throw error
    if (isTask) return res.status(400).send("Possible duplicate task");
    const todo = new Todo(req.body);
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.json(error);
  }
});
// update todo
router.put("/", async (req, res) => {
  try {
    let todo = await Todo.findById(req.body.id);
    if (!todo) return res.status(404).send("Invalid todo id");
    todo = await Todo.findByIdAndUpdate(req.body.id, req.body, { new: true });
    res.send(todo);
  } catch (error) {
    res.json(error);
  }
});

// mark completed true
router.put("/completed", async (req, res) => {
  try {
    let todo = await Todo.findById(req.body.id);
    if (!todo) return res.status(404).send("Invalid todo id");
    todo.completed = req.body.completed;
    await todo.save();
    res.send(todo);
  } catch (error) {
    res.json(error);
  }
});

// delete todo
router.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).send("Todo not found");
    todo.remove();
    return res.send(todo);
  } catch (error) {
    res.json(error);
  }
});

export { router as TodoRouter };
