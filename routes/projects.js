const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');


//create project
 //api/projects

    router.post('/',
    auth,
         [
            check('project_name', 'Project Name is mandatory').not().isEmpty()
         ],
    projectController.CreateProject);

    //get all projects
    router.get('/',
    auth,
    projectController.getProjects);

    //update a project via ID
    router.put('/:id',
    auth,
        [
            check('project_name', 'Project Name is mandatory').not().isEmpty()
        ],
    projectController.updateProject);



    //delete a project via ID
    router.delete('/:id',
    auth,
    projectController.deleteProject);



module.exports = router;