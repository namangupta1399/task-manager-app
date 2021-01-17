const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema;

const Task = mongoose.model('Task', {
    taskName: {
        type: String,
        required: true,
        trim: true
    },
    assignedTo: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
})

module.exports = Task;