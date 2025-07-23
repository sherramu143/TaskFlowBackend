const db = require("../models");
const Project = db.project;

exports.createProject = async (req, res) => {
  try {
    const { name, description, owner_id } = req.body;

    const newProject = await Project.create({ name, description, owner_id });

    res.status(200).json(newProject);
  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProjectById = async (req, res) => {
  try {
    const id=req.params.id;
    const project = await db.project.findOne({ where: { id } });
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { name, description } = req.body;
const id=req.params.id;
    const project = await Project.findOne({where:{id}});
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.name = name || project.name;
    project.description = description || project.description;

    await project.save();
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const id=req.params.id;
    const project = await Project.findOne({where:{id}});
    if (!project) return res.status(404).json({ message: 'Project not found' });

    await project.destroy();
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};