const Task = require('../models/Task');
const Project = require ('../models/Project');
const { validationResult } = require('express-validator');

    //create new Task
    exports.createTask = async (req, res) => {       
        
        //check for errors from express validation
            const errors = validationResult(req);
            if ( !errors.isEmpty() ){
                return res.status(400).json({ errors: errors.array() })
            }


            
            

        try {
            //extract project from petition
            const { project } = req.body;
            
            const project_1 = await Project.findById(project) //necesary new variable to compare further validation
            
            
            if (!project_1) return res.status(404).json({ msg: 'Project not found' });


            //check author
            if (project_1.author.toString() !== req.user.id){
                return res.status(401).json({ msg: 'User is not authorized to create a task on this project' });
            }



            //create task
            const task = new Task(req.body);
            await task.save();
            res.json({ task });

        } catch (error) {
            console.log(error)
            res.status(500).send('There was an error while fetching projects taks')
        }



    }


    //get tasks from project
    exports.getTasks = async (req,res) => { 
        //console.log("REQ DATOS ES: ", req.query.project)
        try {

             //check for errors from express validation
             const errors = validationResult(req);
             if ( !errors.isEmpty() ){
                 return res.status(400).json({ errors: errors.array() })
             }


            //extract project from petition
             const { project } = req.query;  //working for BACKEND (POSTMAN )
             //const { project } = req.body; //working for FRONT-END
             console.log("|----------------------------- GET TASKS ----------------------------------|");
             console.log("|-                                                                        -|");
             console.log("|-        the project ID from req.body is: ", project, "     -|");
             console.log("|-                                                                        -|");
             console.log("|-                                                                        -|");
             


             const project_1 = await Project.findById(project) //necesary new variable to compare further validation
             console.log("|-        The value of project_1 is: ", project_1, "                -|" )
             
             if (!project_1) return res.status(404).json({ msg: 'Project not found' });
 
 
             //check author
             if (project_1.author.toString() !== req.user.id){
                 return res.status(401).json({ msg: 'User is not authorized to get the tasks project' });
             }
 
             
             const tasks = await Task.find ({ project });
//             console.log("|-        the Tasks are: ", tasks, "     -|");
             //console.log("the task are: ", tasks);
             res.json ({ tasks });
            


        } catch (error) {
            console.log(error);
            res.status(500).send('there was an error while Getting all tasks from this project');
        }


    }

    exports.updateTask = async (req, res) => {
          // console.log("SERVER-SIDE REQ BODY", req.body)
            try {
            
                const {project, taskname, status} = req.body;
                    
                //check if the task exists or not, it will be used to perform the update further on LET, if done with const couldnt change value further
                let task_existance = await Task.findById(req.params.id);
                    //if there is no task return
                    if (!task_existance) { return res.status(404).json({ msg: 'Task not found' })  }

                const project_1 = await Project.findById(project) //necesary new variable to compare further validation

                //check author
                if (project_1.author.toString() !== req.user.id){
                    return res.status(401).json({ msg: 'User is not authorized to update a task on this project' });
                }              

                //create an empty task object
                const new_task = {};
                new_task.taskname = taskname;
                new_task.status = status;

                //update task - _id comes from the parameters of the router 
                task_existance = await Task.findOneAndUpdate({ _id: req.params.id }, new_task, { new : true });

                //JSON response
                res.json({ task_existance })
    
            } catch (error) {
            console.log(error)
            res.status(500).send('there was an error whilist updating task')
        }
    }

    exports.deleteTask = async (req,res) => {
        //check for errors from express validation
        const errors = validationResult(req);
        if ( !errors.isEmpty() ){
            return res.status(400).json({ errors: errors.array() })
        }

        let task = await Task.findById(req.params.id);
        if (!task){
            return res.status(404).json({ msg: 'Non existing task' })
        }

        //extract project from petition
        //const { project } = req.body;   //variable for backend (postman) 
        const { project } = req.query;  //variable for front-end
        const project_1 = await Project.findById(project) //necesary new variable to compare further validation


        if (!project_1) return res.status(404).json({ msg: 'Project not found' });


        //check author
        if (project_1.author.toString() !== req.user.id)
        {
            return res.status(401).json({ msg: 'User is not authorized to delete this task on this project' });
        }

        try {
                
                
                //delete task
                await Task.findOneAndRemove({ _id: req.params.id });

                res.json({ msg: 'Task deleted' })

                } catch (error) {
                console.log(error)
                res.status(500).send('there was an error whilist updating task')
                }
        



    }
