import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://9-1379-be.store',
});

axiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axiosInstance; 
