const express = require("express");
const toDoRouter = express.Router();
const multer = require("multer");

let tasks = [];

toDoRouter.get("/tasks", (req, res) => {
  res.json(tasks);
});

toDoRouter.post("/tasks", (req, res) => {
  const { title, desc } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const newTask = {
    id: tasks.length + 1,
    title,
    desc: desc || "",
    createDate: new Date(),
    updateDate: new Date(),
    completed: false,
  };

  tasks.push(newTask);
  res.status(201).json(newTask);
});

toDoRouter.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, desc, completed } = req.body;

  const taskIndex = tasks.findIndex((task) => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }

  tasks[taskIndex] = {
    ...tasks[taskIndex],
    title: title || tasks[taskIndex].title,
    desc: desc || tasks[taskIndex].desc,
    completed: completed || tasks[taskIndex].completed,
    updateDate: new Date(),
  };

  res.json(tasks[taskIndex]);
});

toDoRouter.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);

  tasks = tasks.filter((task) => task.id !== taskId);

  res.json({ message: "Task deleted successfully" });
});

module.exports = toDoRouter;
