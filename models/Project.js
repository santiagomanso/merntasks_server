const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema({
    project_name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId, //self reference, or kind of join of join from the old SQL
        ref: 'User' 
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Project', ProjectSchema);