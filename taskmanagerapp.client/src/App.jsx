import './App.css';
import AddTask from './components/AddTask';
import Login from './components/Login';
import Register from './components/Register';
import TaskList from './components/tasklist';
import { Route, Routes, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function LogoutButton() {
    const { isAuthenticated, logout } = useAuth();
    if (!isAuthenticated) return null;
    return <button onClick={logout} style={{ float: 'right' }}>Logout</button>;
}

function Navbar() {
    const { isAuthenticated } = useAuth();
    return (
        <nav style={{ marginBottom: 20 }}>
            {isAuthenticated && <Link to="/">Home</Link>}
            {!isAuthenticated && <><Link to="/login">Login</Link> | <Link to="/register">Register</Link></>}
        </nav>
    );
}

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <h1>Task Manager App <LogoutButton /></h1>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <TaskList />
                        <AddTask />
                    </ProtectedRoute>
                } />
            </Routes>
        </AuthProvider>
    );
}

export default App;