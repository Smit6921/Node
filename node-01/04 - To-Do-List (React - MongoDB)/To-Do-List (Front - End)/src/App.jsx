import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import './index.css';  

const TaskManager = () => {  
    const [tasks, setTasks] = useState([]);  
    const [title, setTitle] = useState('');  
    const [task, setTask] = useState('');  
    const [editing, setEditing] = useState(null);  

    // Fetch tasks from API when the component mounts  
    useEffect(() => {  
        fetchTasks();  
    }, []);  

    const fetchTasks = async () => {  
        try {  
            const response = await axios.get('http://localhost:8000/work');  
            setTasks(response.data.lists);  
        } catch (err) {  
            console.error('Error fetching tasks:', err.response ? err.response.data : err.message);  
        }  
    };  

    // Function to handle adding a new task  
    const addTask = async () => {  
        if (!title || !task) {  
            console.error('Title and task description cannot be empty');  
            return;  
        }  

        try {  
            const response = await axios.post('http://localhost:8000/work', { title, task });  
            if (response.data.task) {  
                setTasks([...tasks, response.data.task]);  
                setTitle('');  
                setTask('');  
            } else {  
                console.error('No task returned from the server');  
            }  
        } catch (err) {  
            console.error('Error adding task:', err.response ? err.response.data : err.message);  
        }  
    };  

    const deleteTask = async (id) => {  
        try {  
            await axios.delete(`http://localhost:8000/work/${id}`);  
            setTasks(tasks.filter((t) => t._id !== id));  
        } catch (err) {  
            console.error('Error deleting task:', err.response ? err.response.data : err.message);  
        }  
    };  

    const handleEdit = (task) => {  
        setEditing(task._id);  
        setTitle(task.title);  
        setTask(task.task);  
    };  

    const updateTask = async () => {  
        try {  
            const response = await axios.put(`http://localhost:8000/work/${editing}`, { title, task });  
            setTasks(tasks.map(t => (t._id === editing ? response.data.task : t)));  
            setEditing(null);  
            setTitle('');  
            setTask('');  
        } catch (err) {  
            console.error('Error updating task:', err.response ? err.response.data : err.message);  
        }  
    };  

    return (  
        <div className="container">  {/* Container for styling */}  
            <h1>Task Manager</h1>  
            <hr />
            <br />
            <input  
                type="text"  
                placeholder="Task Title"  
                value={title}  
                onChange={(e) => setTitle(e.target.value)}  
                required  
            />  
            <input  
                type="text"  
                placeholder="Task Description"  
                value={task}  
                onChange={(e) => setTask(e.target.value)}  
                required  
            />  
            <button onClick={editing ? updateTask : addTask}>  
                {editing ? 'Update Task' : 'Add Task'}  
            </button>  
            <ul>  
                {tasks.map(t => (  
                    <li key={t._id}>  
                        <h3>{t.title}</h3>  
                        <p><i class="fa-solid fa-angles-right forIcon"></i>{t.task}</p>  
                        <button onClick={() => handleEdit(t)} className="edit">Edit</button>  
                        <button onClick={() => deleteTask(t._id)} className="delete">Delete</button>  
                    </li>  
                ))}  
            </ul>  
        </div>  
    );  
};  

export default TaskManager;