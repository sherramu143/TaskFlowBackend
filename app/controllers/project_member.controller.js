const db=require("../models");

const { ProjectMember } = db.project_members;

exports.addMember = async (req, res) => {
  try {
    const member = await ProjectMember.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllMembers = async (req, res) => {
  try {
    const members = await ProjectMember.findAll();
    res.json(members);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMemberById = async (req, res) => {
  try {
    const member = await ProjectMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMemberRole = async (req, res) => {
  try {
    const member = await ProjectMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    await member.update({ role: req.body.role });
    res.json(member);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.removeMember = async (req, res) => {
  try {
    const member = await ProjectMember.findByPk(req.params.id);
    if (!member) return res.status(404).json({ message: 'Member not found' });

    await member.destroy();
    res.json({ message: 'Member removed successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
