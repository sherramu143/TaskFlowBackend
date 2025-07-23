const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments.controller");
module.exports = (app) => {
// Create a comment for a specific task
router.post("/task/:taskId", commentController.createComment);

// Get all comments for a specific task
router.get("/task/:taskId", commentController.getAllComments);

// Get a specific comment by its ID
router.get("/:id", commentController.getCommentById);

// Update a specific comment
router.put("/:id", commentController.updateComment);

// Delete a specific comment
router.delete("/:id", commentController.deleteComment);
 app.use("/api/user", router);
};

