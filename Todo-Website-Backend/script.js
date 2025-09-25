const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

async function Main(){
    try{
        await mongoose.connect("MONGO_URL");
        console.log("MongoDB server connected sucessfully!");

        const { TaskModel } = require("./db");

        app.post("/create", async (req,res) => {
            const inputVal = req.body.input;
            const isCompleted  = false;

            if(!inputVal || inputVal.trim() === ""){
                return res.status(400).json({
                    message: "Input is empty or wrong"
                });
            }
            try{
                const todoTask = await TaskModel.create({
                    Task: inputVal                    
                });
                return res.status(200).json(todoTask);
            }catch(error){
                console.error("Database error:", error);
            return res.status(500).json({ message: "Failed to create task" });
            }
        });

        app.get("/todos", async (req, res) =>{
            try{
                const show = await TaskModel.find({}).sort({ createdAt: 1 });
                res.status(200).json(show);
            }catch (error){
                console.error("Database error:", error);
                res.status(500).json({ message: "Failed to fetch tasks" });

            }
        });

        app.put("/update/:id", async(req,res) => {
            const  taskId  = req.params.id;
            const updatedTask = req.body;
            try{
                console.log(taskId);
                const updatingTask = await TaskModel.findByIdAndUpdate(taskId, updatedTask, { new: true });
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

        app.delete("/delete/:id" , async (req, res) => {
            const taskId = req.params.id;
            try{
                console.log(taskId);
                const deleteTask = await TaskModel.findByIdAndDelete(taskId);
                if(!deleteTask){
                    return res.status(404).json({
                        message: "Task not found"
                    });
                }
                res.status(200).json(deleteTask);
            }
            catch (error){
                res.status(500).json({message: "Detabase not working: ", error});
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




