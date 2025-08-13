import { useState } from "react";
import api from "../services/api";


const AddTask = ({ onTaskAdded }) => {
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
        onTaskAdded(); // ✅ refresh task list

    }
    return (
        //<div className="flex  flex-row w-full  bg-gray-100 space-y-4">
            <div className="p-4">

            <form
                className="bg-white shadow rounded-lg p-6 w-full max-w-md"
                onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">Add Task</h2>

                <label className="block text-sm font-medium mb-1">Title</label>

                <input type='text' name='title'
                    className="w-full border rounded px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={task.title} placeholder='Enter you task title here !' onChange={handleChange} /><br />

                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    placeholder="Enter task description here!"
                    className="w-full border rounded px-3 py-2 mb-3 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                />


                <div className="flex gap-3 mb-4">
                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Status</label>
                        <select
                            name="status"
                            value={task.status}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 bg-white"
                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>

                    <div className="flex-1">
                        <label className="block text-sm font-medium mb-1">Priority</label>
                        <select
                            name="priority"
                            value={task.priority}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2 bg-white"
                        >
                            <option value="Low">Low</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                </div>
                <button type='submit'
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                > Add Task</button>

            </form>
        </div>
    );
};

export default AddTask;