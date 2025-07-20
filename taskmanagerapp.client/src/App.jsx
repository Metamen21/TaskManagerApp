import './App.css';
import AddTask from './components/AddTask';
import TaskList from './components/tasklist';
import { Link, Route, Routes } from 'react-router-dom';


function App() {
    
    return (
        <div>
        <h1>Task Manager App</h1>
            {/*<TaskList />*/}
            {/*<nav>*/}
            {/*    <Link to="/">Task List</Link> | <Link to="/add">Add new Task</Link>*/}
            {/*</nav>*/}
            {/*<Routes>*/}
            {/*    <Route path="/" element={<TaskList />} />*/}
            {/*    <Route path="/add" element={<AddTask />} />*/}
            {/*</Routes>*/}
            <TaskList />
            <AddTask/>
        </div>
    );
    
}

export default App;