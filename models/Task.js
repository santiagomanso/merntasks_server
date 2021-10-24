const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema({
    taskname: {
        type: String,
        require : true,
        trim: true
    },
    status: {
        type : Boolean,
        default : false
    },
    created: {
        type : Date,
        default : Date.now()
    },
    project: {
        type : mongoose.Schema.Types.ObjectId, //self reference
        ref : 'Project'
    }
})

module.exports = mongoose.model('Task', TaskSchema);