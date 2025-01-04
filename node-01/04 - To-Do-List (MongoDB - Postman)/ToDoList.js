const express = require('express')
const app = express();
const mongoose = require("mongoose");

app.use(express.json());

const PORT = 8000;

const lists = [];

const taskSchema = new mongoose.Schema({
    title: String,
    task: String,
    done: String,
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
        await newTask.save();  
        res.status(201).json({ 
            msg: "Your List is Added Successfully !!",
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


// For Updating the Data of Single User  
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
        });  
    } catch (err) {  
        res.status(400).json({ 
            msg: 'Bad Request', error: err.message, 
        });  
    }  
}); 

app.listen(PORT , async () => {
    await mongoose.connect("mongodb://127.0.0.1:27017/to-do-list")
    .then(() => console.log("DB connected"))  
    .catch((err) => console.error("DB connection error:", err));
    // console.log("DB connected");
    console.log(`server is running on http://localhost:${PORT}`);
});