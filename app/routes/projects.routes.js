const express=require("express");
const router=express.Router();
const bodyParser = require("body-parser");
const projectController=require("../controllers/project.controller");
module.exports=(app)=>{
router.post('/',bodyParser.json(),projectController.createProject);
router.get('/',projectController.getAllProjects);
router.get('/:id',projectController.getProjectById);
router.put('/:id',projectController.updateProject);
router.delete('/:id',projectController.deleteProject);

 app.use("/api/project", router);
}
