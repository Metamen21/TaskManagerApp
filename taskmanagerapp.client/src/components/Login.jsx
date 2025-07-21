import { useState } from "react";
import api from "../services/api";
import { useAuth } from "../AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () =>{
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        const res = await api.post('/api/auth/login', user);
        login(res.data.token);
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            <input type="email" name="email" placeholder="Enter your Email" value={user.email} onChange={handleChange}/> <br/>
            <input type="password" name="password" placeholder="Enter your Password" value={user.password} onChange={handleChange}/> <br/> <br/>
            <button type="submit">Continue</button>
            <div>
                Don't have an account? <Link to="/register">Register here</Link>
            </div>
        </form>
    );
};

export default Login;