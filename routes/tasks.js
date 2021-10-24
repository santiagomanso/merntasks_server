const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const { check } = require('express-validator');

    //create task
    //api/task
    router.post('/',
        auth, 
        [
            check('taskname', 'Task name is mandatory').not().isEmpty(),
            check('project', 'An associated project is mandatory').not().isEmpty()
        ],

        taskController.createTask

    );


    //get tasks from project
    router.get('/',
        auth,
        taskController.getTasks
    )

    //update tasks  id goes as req.params.id
    router.put('/:id',
        auth,
        taskController.updateTask
    )

    // delete task id goes as req.params.id
    router.delete('/:id',
        auth,
        taskController.deleteTask
    )

    module.exports = router;