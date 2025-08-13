import {  useState } from "react";
import api from "../services/api";

const TaskList = ({ tasks, onDelete }) => {
    //const [task, setTask] = useState({ 'title': '', 'description': '' });

    const [statusFilter, setStatusFilter] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("");
    const [sortOption, setSortOption] = useState("date");
    const [search, setSearch] = useState("");


    const deleteTask = async (id) => {
        await api.delete(`api/task/${id}`);
        onDelete(); // ✅ refresh task list
    };

    // Client-side filtering (works even if API isn't updated yet)
    const filtered = tasks
        .filter((t) => !statusFilter || t.status === statusFilter)
        .filter((t) => !priorityFilter || t.priority === priorityFilter)
        .filter(
            (t) =>
                !search ||
                (t.title && t.title.toLowerCase().includes(search.toLowerCase())) ||
                (t.description &&
                    t.description.toLowerCase().includes(search.toLowerCase()))
        );

    const sorted = [...filtered].sort((a, b) => {
        if (sortOption === "priority") return (b.priority || "").localeCompare(a.priority || "");
        return new Date(b.createdAt || b.id) - new Date(a.createdAt || a.id);
    });

    return (
        <div className="p-4 w-full">
            {/* Controls */}
            <div className="bg-gray-50 p-3 rounded-md flex flex-wrap gap-3 items-center">
                <input
                    type="text"
                    placeholder="Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border px-3 py-2 rounded flex-1 min-w-[160px]"
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Tasks</option>
                    <option value="Pending">Pending</option>
                    <option value="Completed">Completed</option>
                </select>

                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="">All Priority</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                </select>

                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className="border px-3 py-2 rounded"
                >
                    <option value="date">Sort by Date</option>
                    <option value="priority">Sort by Priority</option>
                </select>
            </div>

            {/* Task cards */}
            <div className="mt-4 space-y-3">
                {sorted.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white shadow rounded p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
                    >
                        <div className="mb-3 sm:mb-0 sm:flex-1">
                            <h3 className="font-bold text-lg">{t.title}</h3>
                            <p className="text-gray-600">{t.description}</p>

                            <div className="mt-2 flex gap-2 items-center">
                                <span
                                    className={`px-2 py-1 rounded text-white text-sm ${t.status === "Completed" ? "bg-green-500" : "bg-yellow-500"
                                        }`}
                                >
                                    {t.status}
                                </span>
                                <span
                                    className={`px-2 py-1 rounded text-white text-sm ${t.priority === "High" ? "bg-red-500" : "bg-blue-500"
                                        }`}
                                >
                                    {t.priority}
                                </span>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => deleteTask(t.id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}

                {sorted.length === 0 && (
                    <div className="text-gray-500 p-4">No tasks found.</div>
                )}
            </div>
        </div>
    );
};

export default TaskList;
