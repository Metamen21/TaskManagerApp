// src/services/api.js
import axios from 'axios';
// This file sets up an Axios instance for making API requests.
const api = axios.create({
    //baseURL: 'https://localhost:5001/api', // Adjust port if needed
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
