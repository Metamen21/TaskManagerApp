import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () =>{
    const [user,setUser]=useState({
        email:"",
        password:""
    });
    const navigate = useNavigate();
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        await api.post('/api/auth/register', user);
        console.log('user registered');
        navigate('/login');
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <input type="email" name="email" placeholder="Enter your Email" value={user.email} onChange={handleChange}/> <br/>
            <input type="password" name="password" placeholder="Enter your Password" value={user.password} onChange={handleChange}/> <br/> <br/>
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;