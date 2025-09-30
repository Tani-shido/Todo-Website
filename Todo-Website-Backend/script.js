const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(express.json());

// Your CORS setup is fine, no changes needed here.
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
                    Task: inputVal
                });
                // --- FIX HERE ---
                // Simply return the created task object.
                return res.status(200).json(todoTask);
            }catch(error){
                console.error("Database error:", error);
                return res.status(500).json({ message: "Failed to create task" });
            }
        });

        // The /todos route was already correct, no changes needed.
        app.get("/todos", async (req, res) =>{
            try{
                const show = await TaskModel.find({});
                res.status(200).json(show);
            }catch (error){
                console.error("Database error:", error);
                res.status(500).json({ message: "Failed to fetch tasks" });
            }
        });

        app.put("/update/:id", async(req,res) => {
            const taskId = req.params.id;
            const updatedTask = req.body;
            try{
                const updatingTask = await TaskModel.findByIdAndUpdate(taskId, updatedTask, { new: true }); // added {new: true} to get the updated document back
                if(!updatingTask){
                    return res.status(404).json({
                        message: "Task not found"
                    });
                }
                // --- FIX HERE ---
                res.status(200).json(updatingTask);
            }
            catch (error){
                console.log("Database error: ", error);
                res.status(500).json({message:"Failed to update task"});
            }
        });

        app.delete("/delete/:id" , async (req, res) => {
            const taskId = req.params.id;
            try{
                const deleteTask = await TaskModel.findByIdAndDelete(taskId);
                if(!deleteTask){ // <-- FIX: Check if the task was actually found and deleted
                    return res.status(404).json({ // <-- FIX: Use 404 for "not found"
                        message: "Task not found"
                    });
                }
                // --- FIX HERE ---
                res.status(200).json({ message: "Task successfully deleted", deletedTask: deleteTask });
            }
            catch (error){
                res.status(500).json({message: "Database error: ", error}); // <-- FIX: Use 500 for server errors
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
