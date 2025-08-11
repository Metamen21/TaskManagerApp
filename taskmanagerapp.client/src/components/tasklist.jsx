import { useEffect, useState } from "react";
import api from "../services/api";

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(
        () => {
            api.get(`api/task`)
                .then(res => setTasks(res.data))
                .catch(err => { console.log("Failure Occured: " + err) });
        }, []);

    const deleteTask = async (id) => {
        await api.delete(`api/task/${id}`);
        setTasks(tasks.filter(t => t.id !== id));
    };

    return (
        <ul>

            {
                tasks.map(t => (
                    //<li key={t.id}>{t.title}  <button onClick={() => deleteTask(t.id)}>Delete</button></li>


                    <div className="bg-white shadow rounded p-4 mb-2 flex justify-between items-center">
                        <div>
                            <h3 className="font-bold">{t.title}</h3>
                            <p className="text-gray-600">{t.description}</p>
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            onClick={() => deleteTask(t.id)}
                        >Delete</button>
                    </div>

                ))
            }
        </ul>
    );
};

export default TaskList;