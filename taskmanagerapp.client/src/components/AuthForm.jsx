import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../AuthContext";

const AuthForm = ({ mode }) => {
    const isLogin = mode === "login";
    const [user, setUser] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user.email || !user.password) {
            alert("Please fill in all fields.");
            return;
        }
        if (!isLogin && user.password.length < 6) {
            alert("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);
            if (isLogin) {
                const res = await api.post("/api/auth/login", user);
                login(res.data.token);
                navigate("/");
            } else {
                await api.post("/api/auth/register", user);
                alert("Registration successful! Please login.");
                navigate("/login");
            }
        } catch (err) {
            console.error("Auth error:", err);
            alert(err.response?.data || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen ">
            <div className="bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-80"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-4">
                    {isLogin ? "Login" : "Register"}
                </h2>

                <input
                    type="email"
                    name="email"
                    className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your Email"
                    value={user.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    className="w-full border p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                    placeholder="Enter your Password"
                    value={user.password}
                    onChange={handleChange}
                />

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full text-white py-2 rounded ${loading
                        ? "bg-gray-400"
                        : isLogin
                            ? "bg-blue-500 hover:bg-blue-600"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    {loading
                        ? isLogin
                            ? "Logging in..."
                            : "Registering..."
                        : isLogin
                            ? "Continue"
                            : "Register"}
                </button>

                <div className="mt-4 text-sm text-center">
                    {isLogin ? (
                        <>
                            Don't have an account?{" "}
                            <Link className="text-blue-500 hover:underline" to="/register">
                                Register here
                            </Link>
                        </>
                    ) : (
                        <>
                            Already have an account?{" "}
                            <Link className="text-blue-500 hover:underline" to="/login">
                                Login here
                            </Link>
                        </>
                    )}
                </div>
            </form>
            </div>
        </div>
    );
};

export default AuthForm;
