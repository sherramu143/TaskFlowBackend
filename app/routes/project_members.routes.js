const express=require("express");
const router=express.Router();
const projectMemberController = require('../controllers/project_member.controller');

module.exports = (app) => {
  app.post('/api/project-members', projectMemberController.addMember);
  app.get('/api/project-members', projectMemberController.getAllMembers);
  app.get('/api/project-members/:id', projectMemberController.getMemberById);
  app.put('/api/project-members/:id', projectMemberController.updateMemberRole);
  app.delete('/api/project-members/:id', projectMemberController.removeMember);
  app.use('/api/project_members',router);
};
