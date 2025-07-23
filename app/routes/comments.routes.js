const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const userController = require("../controllers/user.controller");

module.exports = (app) => {
  // Create a new user (signup)
  router.post("/", bodyParser.json(), userController.createUser);

  // Get all users
  router.get("/", userController.getAllUsers);

  // Get a user by ID
  router.get("/:id", userController.getUserById);

  // Update a user
  router.put("/:id", bodyParser.json(), userController.updateUser);

  // Delete a user
  router.delete("/:id", userController.deleteUser);

  // Mount router at /api/users
  app.use("/api/users", router);
};
