import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

console.log('API Base URL:', api.defaults.baseURL);

// Add a request interceptor to add the auth token to headers
api.interceptors.request.use(
    (config) => {
        console.log('Requesting:', config.baseURL ? config.baseURL + config.url : config.url);
        const user = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        if (user) {
            const { token } = JSON.parse(user);
            // Only add token if it's not the mock token
            if (token && token !== 'mock-token') {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Clear local storage and redirect to login
            if (typeof window !== 'undefined') {
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export default api;
