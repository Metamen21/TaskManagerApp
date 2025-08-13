import { useEffect, useState } from "react";
import AddTask from "./AddTask";
import TaskList from "./tasklist";
import api from "../services/api";



const Dashboard=()=> {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async (params = {}) => {
        // If you moved filtering to backend, use params in API call
        const res = await api.get("/api/task", { params });
        setTasks(res.data);
    };


    useEffect(() => {
        fetchTasks();
    }, []);



    return (
        <main className="max-w-6xl mx-auto p-4">
            <h1 className="text-3xl font-bold mb-6">Task Manager App</h1>
            {/*<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">*/}
            {/*    */}{/* Left: form (1 column on large screens) */}
            {/*    <div className="lg:col-span-1">*/}
            {/*        <AddTask />*/}
            {/*    </div>*/}

            {/*    */}{/* Right: task list (2 columns on large screens) */}
            {/*    <div className="lg:col-span-2">*/}
            {/*        <TaskList />*/}
            {/*    </div>*/}
            {/*</div>*/}
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                    {/*<AddTask />*/}
                    <AddTask onTaskAdded={fetchTasks} />

                </div>
                <div className="lg:w-2/3">
                    {/*<TaskList />*/}
                    <TaskList tasks={tasks} onDelete={fetchTasks} />

                </div>
            </div>

        </main>
    );
}
export default Dashboard;