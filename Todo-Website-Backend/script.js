const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

async function Main(){
    try{
        await mongoose.connect("mongodb+srv://shikaridota777:ZClPvfWjJINgzaFN@cluster0.12wqhve.mongodb.net/Todo-Website");
        console.log("MongoDB server connected sucessfully!");

        const { TaskModel } = require("./db");

        app.post("/create", async (req,res) => {
            const inputVal = req.body.input;

            if(!inputVal || inputVal.trim() === ""){
                return res.status(400).json({
                    message: "Input is empty or wrong"
                });
            }
            try{
                const todoTask = await TaskModel.create({
                    Task: inputVal,
                    isCompleted: false // This is correct, new tasks are not complete
                });
                return res.status(200).json(todoTask);
            }catch(error){
                console.error("Database error:", error);
                return res.status(500).json({ message: "Failed to create task" });
            }
        });

        app.get("/todos", async (req, res) =>{
            try{
                // Sort by creation date to show newest first
                const show = await TaskModel.find({}).sort({ createdAt: -1 });
                res.status(200).json(show);
            }catch (error){
                console.error("Database error:", error);
                res.status(500).json({ message: "Failed to fetch tasks" });
            }
        });

        // --- CHANGED: Improved Update Route ---
        app.put("/update/:id", async(req,res) => {
            const taskId = req.params.id;
            const updatedData = req.body; // e.g., { isCompleted: true }
            try{
                // { new: true } ensures the updated document is returned
                const updatingTask = await TaskModel.findByIdAndUpdate(taskId, updatedData, { new: true });
                if(!updatingTask){
                    return res.status(404).json({
                        message: "Task not found"
                    });
                }
                res.status(200).json(updatingTask);
            }
            catch (error){
                console.log("Database error: ", error);
                res.status(500).json({message:"Failed to update task"});
            }
        });

        // --- CHANGED: Improved Delete Route ---
        app.delete("/delete/:id" , async (req, res) => {
            const taskId = req.params.id;
            try{
                const deleteTask = await TaskModel.findByIdAndDelete(taskId);
                // Check if a task was actually found and deleted
                if(!deleteTask){
                    return res.status(404).json({
                        message: "Task not found"
                    });
                }
                res.status(200).json({ message: "Task deleted successfully", task: deleteTask });
            }
            catch (error){
                // Use 500 for internal server/database errors
                res.status(500).json({message: "Database error during deletion", error});
            }
        });
        
        app.listen(5505 , () => {
            console.log("Server is running man!");
        });
    }
    catch (error) {
    console.error("Could not start the server:", error);
    }
}
Main();
