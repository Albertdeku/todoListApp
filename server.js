import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const todosFilePath = path.join(__dirname, "todos.json");
const completedTodosFilePath = path.join(__dirname, "completedTodos.json");

app.get("/todos", (req, res) => {
  const data = fs.readFileSync(todosFilePath, "utf-8");
  res.json(JSON.parse(data));
});

app.post("/todos", (req, res) => {
  const todos = req.body;
  fs.writeFileSync(todosFilePath, JSON.stringify(todos, null, 2));
  res.status(200).send("Todos updated");
});

app.get("/completedTodos", (req, res) => {
  const data = fs.readFileSync(completedTodosFilePath, "utf-8");
  res.json(JSON.parse(data));
});

app.post("/completedTodos", (req, res) => {
  const todos = req.body;
  fs.writeFileSync(completedTodosFilePath, JSON.stringify(todos, null, 2));
  res.status(200).send("Completed todos updated");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});