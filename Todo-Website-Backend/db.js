const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  Task: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

const TaskModel = mongoose.model("Task", TaskSchema);

module.exports = { TaskModel };
