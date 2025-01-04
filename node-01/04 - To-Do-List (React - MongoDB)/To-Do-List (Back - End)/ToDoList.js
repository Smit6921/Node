const express = require('express');  
const mongoose = require('mongoose');  
const cors = require('cors');  

const app = express();  
app.use(express.json());  
app.use(cors());  

const PORT = 8000;  

// Schema and Model Setup  
const taskSchema = new mongoose.Schema({  
    title: String,  
    task: String,  
    // done: { type: Boolean, default: false }   
});  

const Task = mongoose.model('Task', taskSchema);  

// For Getting the Data  
app.get("/work", async (req, res) => {  
    try {  
        const tasks = await Task.find();  
        res.json({  
            lists: tasks,  
        });  
    } catch (err) {  
        res.status(500).json({  
            msg: 'Internal Server Error',  
        });  
    }  
});  

// For Creating User or Data  
app.post("/work", async (req, res) => {  
    try {  
        const newTask = new Task(req.body);  
        const savedTask = await newTask.save();   
        res.status(201).json({  
            msg: "Your List is Added Successfully !!",  
            task: savedTask,   
        });  
    } catch (err) {  
        res.status(400).json({  
            msg: 'Bad Request', error: err.message,  
        });  
    }  
});  

// For Getting Single Data  
app.get("/work/:work_id", async (req, res) => {  
    try {  
        const task = await Task.findById(req.params.work_id);  
        if (!task) {  
            return res.status(404).json({  
                msg: "Task does not exist",  
            });  
        }  
        return res.status(200).json({  
            work: task,  
        });  
    } catch (err) {  
        res.status(500).json({  
            msg: 'Internal Server Error',  
        });  
    }  
});  

// For Deleting a single data  
app.delete("/work/:work_id", async (req, res) => {  
    try {  
        const task = await Task.findByIdAndDelete(req.params.work_id);  
        if (!task) {  
            return res.status(404).json({  
                msg: "Task does not exist",  
            });  
        }  
        return res.status(204).json({  
            msg: "Task is removed successfully.",  
        });  
    } catch (err) {  
        res.status(500).json({  
            msg: 'Internal Server Error',  
        });  
    }  
});  

// For Updating the Data of A Single Task  
app.put("/work/:work_id", async (req, res) => {  
    try {  
        const task = await Task.findByIdAndUpdate(req.params.work_id, req.body, { new: true });  
        if (!task) {  
            return res.status(404).json({  
                msg: "Task does not exist",  
            });  
        }  
        return res.status(200).json({  
            msg: "Task has been updated successfully",  
            task: task,  
        });  
    } catch (err) {  
        res.status(400).json({  
            msg: 'Bad Request', error: err.message,  
        });  
    }  
});  

 
app.listen(PORT, async () => {  
    await mongoose.connect("mongodb://127.0.0.1:27017/to-do-list")  
        .then(() => console.log("DB connected"))  
        .catch((err) => console.error("DB connection error:", err));  
    console.log(`Server is running on http://localhost:${PORT}`);  
});