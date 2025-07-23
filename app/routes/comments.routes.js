module.exports = (app) => {
  const express = require("express");
  const router = express.Router();
  const commentController = require("../controllers/comments.controller");

  router.post("/task/:task_id", commentController.createComment);
  router.get("/task/:task_id", commentController.getAllComments);
  router.get("/:id", commentController.getCommentById);
  router.put("/:id", commentController.updateComment);
  router.delete("/:id", commentController.deleteComment);

  app.use("/api/comments", router);
};
