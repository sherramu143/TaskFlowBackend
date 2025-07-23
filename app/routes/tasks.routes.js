const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const taskController = require("../controllers/task.controller");

module.exports = (app) => {
  // Core CRUD routes for tasks
  router.post("/", bodyParser.json(), taskController.createTask);
  router.get("/all/:id", taskController.getAllTasks);
  router.get("/:id", taskController.getTaskById);
  router.put("/:id", taskController.updateTask);
  router.delete("/:id", taskController.deleteTask);

  // Additional: Get tasks by project ID
  //router.get("/project/:projectId", taskController.getTasksByProjectId);

  // Mount the router
  app.use("/api/task", router);
};
