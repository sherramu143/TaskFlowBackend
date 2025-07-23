const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

module.exports = (app) => {
  app.post('/api/users/login', userController.loginUser);  // changed path here for consistency
  app.post('/api/users', userController.createUser);
  app.get('/api/users', userController.getAllUsers);
  app.get('/api/users/:id', userController.getUserById);
  app.put('/api/users/:id', userController.updateUser);
  app.delete('/api/users/:id', userController.deleteUser);
  app.use("/api/user", router);
};
