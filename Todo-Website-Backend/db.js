const mongoose = require("mongoose");

const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId;

const TaskSchema = new Schema({
    Task: {type: String},
    // --- FIX HERE ---
    isCompleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true}); 

const TaskModel = mongoose.model("Task" , TaskSchema);

module.exports = { TaskModel };
