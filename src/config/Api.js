import axios from 'axios';

const Api = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})

Api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    config.headers.authorization = `Bearer ${token}`
    return config
})

export default Api;