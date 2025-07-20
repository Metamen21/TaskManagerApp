import { useState } from "react";
import api from "../services/api";


const AddTask = () => {
    const [task, setTask] = useState({ 'title': '', 'description': '' });

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // Here you would typically send the task to your API
       await api.post('/api/task', task);
        console.log("Task submitted:", task);
        // Reset the form
        setTask({ 'title': '', 'description': '' });
    }
    return (
        <form onSubmit={handleSubmit}>
            Title: <input type='text' name='title' value={task.title} placeholder='Enter you task title here !' onChange={handleChange} /><br />
            Description:<input type='text' name='description' value={task.description} placeholder='Enter task description here!' onChange={handleChange} /><br />
            <button type='submit'> Add Task</button>

        </form>
    );
};

export default AddTask;