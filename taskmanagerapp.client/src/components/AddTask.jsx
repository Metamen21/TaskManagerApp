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
        <div className="flex  flex-row w-full  bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-100" onSubmit={handleSubmit}>
                Title: <input type='text' name='title'
                    className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                    value={task.title} placeholder='Enter you task title here !' onChange={handleChange} /><br />
                Description:<input type='text' name='description'
                    className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                    value={task.description} placeholder='Enter task description here!' onChange={handleChange} /><br />
                <button type='submit'
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                > Add Task</button>

            </form>
        </div>
    );
};

export default AddTask;