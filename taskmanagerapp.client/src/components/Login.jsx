import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await api.post('/api/auth/login', user);
        login(res.data.token);
        navigate("/");
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>

                <h2 className="text-2xl font-bold mb-4">Login</h2>

                <input type="email" name="email"
                    className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                    placeholder="Enter your Email" value={user.email} onChange={handleChange} /> <br />
                <input type="password" name="password"
                    className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"

                    placeholder="Enter your Password" value={user.password} onChange={handleChange} /> <br /> <br />
                <button type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Continue</button>
                <div>
                    Don't have an account? <Link className="" to="/register">Register here</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;