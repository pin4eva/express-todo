// import express
import express from "express";
import { connectDB } from "./db/mongo-init";
import { PostRouter } from "./routes/post.routes";
import { TodoRouter } from "./routes/todo.routes";
import { UserRouter } from "./routes/user.routes";

// initialize express
const app = express();

// Add our middlewares
app.use(express.json());
app.get("/", (_, res) => res.send("Welcome home"));
app.use("/todo", TodoRouter);
app.use("/post", PostRouter);
app.use("/user", UserRouter);

// we run our server
async function startServer() {
  try {
    await connectDB();
    app.listen(8000, () => {
      console.log(`server listening on port 8000`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

startServer();
