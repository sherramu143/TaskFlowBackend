const { where } = require("sequelize");
const db=require("../models");

const { Comment } = db.comments;
exports.createComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { taskId } = req.params;  // assuming you get taskId from URL params

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Comment content cannot be empty" });
    }

    // You might want to also attach userId from auth middleware here
    const comment = await db.comments.create({
      content: content.trim(),
      task_id:taskId,
      user_id:1,
      // userId: req.user.id  // if you have user auth middleware
    });

    res.status(201).json(comment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getAllComments = async (req, res) => {
  try {
    const task_id=req.params.task_id;
    const comments = await db.comments.findAll({where: {task_id }});
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getCommentById = async (req, res) => {
  try {
    const id=req.params.id;
    const comment = await db.comments.findOne({where: { id } });
    if (!comment) return res.status(404).json({ message: 'Comment not found' });
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const id=req.params.id;
    const comment = await db.comments.findOne({where:{id}});
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    await comment.update(req.body);
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const id=req.params.id;
    const comment = await db.comments.findOne({where:{id}});
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
