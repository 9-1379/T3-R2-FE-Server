import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://ec2-43-202-6-5.ap-northeast-2.compute.amazonaws.com:8000',
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
