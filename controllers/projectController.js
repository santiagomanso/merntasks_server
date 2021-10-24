const Project = require('../models/Project');
const { validationResult } = require('express-validator'); 

exports.CreateProject = async (req,res) => {

    //check for errors from express validation
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() })
    }


    try {
        
        //create a new project
        const project = new Project(req.body);

        //save project based on JWT
        project.author = req.user.id;

        //save project
        project.save();
        res.json(project);

    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error when creating this project');
    }
}

//get all projects from logged user
exports.getProjects = async (req, res) => {
    try {
        const projects = await Project.find({ author: req.user.id }).sort({ created: -1 });
        res.json({ projects }) ;
        
    } catch (error) {
        console.log(error);
        res.status(500).send('There was an error getting all projects') 
    }
}

exports.updateProject = async (req, res) => {
   
    //check for errors from express validation
    const errors = validationResult(req);
    if ( !errors.isEmpty() ){
        return res.status(400).json({ errors: errors.array() })
    }

    //extract project info
    const { project_name } = req.body;
    const newProject = {};
    if (project_name){
        newProject.name = project_name;
    }

    try {

        //check id
        let project = await Project.findById(req.params.id);

        

        //check if project exists
            if (!project){
                res.status(404).json({msg: 'Project not found'});
            }


        //check author
            if (project.author.toString() !== req.user.id){
                return res.status(401).json({ msg: 'User is not authorized to update this project' });
            }


        //UPDATE
            project = await Project.findByIdAndUpdate({ _id: req.params.id }, { $set : newProject }, { new : true });

        res.json({project})

    } catch (error) {
        console.log(error)
        res.status(500).send("There was an error when updating");
    }
}

//delete a project based on ID
exports.deleteProject = async (req,res) => {


        

        try {

            //check id
                let project = await Project.findById(req.params.id);


            //check if project exists
                if (!project){
                    res.status(404).json({msg: 'Project not found'});
                }


            //check author
                if (project.author.toString() !== req.user.id){
                    return res.status(401).json({ msg: 'This user is not authorized to delete this project' });
                }

            //delete project
            await Project.findOneAndRemove({ _id: req.params.id })
            res.json({msg : "Project deleted"})




        } catch (error) {
            console.log(error)
            res.status(500).send("There was an error when deleting")
        }




}