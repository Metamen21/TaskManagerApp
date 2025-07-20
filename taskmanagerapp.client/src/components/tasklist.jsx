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
            <li>Value 1 </li>
            {
                tasks.map(t => (
                    <li key={t.id}>{t.title}  <button onClick={() => deleteTask(t.id)}>Delete</button></li>
                ))
            }
        </ul>
    );
};

export default TaskList;