import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import { Route, Routes, NavLink } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';

function LogoutButton() {
    const { isAuthenticated, logout } = useAuth();
    if (!isAuthenticated) return null;
    return (
        <button
            onClick={logout}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
            Logout
        </button>
    );
}

function Navbar() {
    const { isAuthenticated } = useAuth();
    return (
        <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white shadow mb-6">
            <div className="text-lg font-bold">
                {isAuthenticated && (
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:underline ${isActive ? 'text-blue-700' : 'text-blue-600'}`
                        }
                    >
                        Home
                    </NavLink>
                )}
            </div>
            <div className="flex items-center gap-4">
                {/*{!isAuthenticated && (*/}
                {/*    <>*/}
                {/*        <NavLink*/}
                {/*            to="/login"*/}
                {/*            className={({ isActive }) =>*/}
                {/*                `hover:underline ${isActive ? 'text-blue-700' : 'text-blue-600'}`*/}
                {/*            }*/}
                {/*        >*/}
                {/*            Login*/}
                {/*        </NavLink>*/}
                {/*        <NavLink*/}
                {/*            to="/register"*/}
                {/*            className={({ isActive }) =>*/}
                {/*                `hover:underline ${isActive ? 'text-blue-700' : 'text-blue-600'}`*/}
                {/*            }*/}
                {/*        >*/}
                {/*            Register*/}
                {/*        </NavLink>*/}
                {/*    </>*/}
                {/*)}*/}
                {isAuthenticated && <LogoutButton />}
            </div>
        </nav>
    );
}

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <div className="max-w-6xl mx-auto px-4">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Dashboard />
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </div>
        </AuthProvider>
    );
}

export default App;
