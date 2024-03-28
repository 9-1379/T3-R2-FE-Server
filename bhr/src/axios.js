import axios from 'axios';
const token = localStorage.getItem('access_token');
const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
        Authorization: token,
    }
});
export default axiosInstance;