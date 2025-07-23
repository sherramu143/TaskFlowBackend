const { where } = require("sequelize");
const db=require("../models");

const { Task } = db.tasks;

exports.createTask = async (req, res) => {
  try {
    const task = await db.tasks.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const id=req.params.id;
    const tasks = await db.tasks.findAll({where:{project_id:id}});
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.getTaskById = async (req, res) => {
  try {
    const id = req.params.id;
    const task = await db.tasks.findOne({ where: { id } });
    return res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.updateTask = async (req, res) => {
  try {
    const task = await db.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.update(req.body);
    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    await task.destroy();
    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
