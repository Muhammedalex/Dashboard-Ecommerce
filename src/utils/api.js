import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/',  // Replace with your API base URL
});

// Middleware to add Bearer token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):null; // Replace with your actual token retrieval logic

    if (token) {
      config.headers.Authorization = `Bearer ${token.token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;