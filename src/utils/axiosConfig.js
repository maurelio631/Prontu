import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000', // Ajuste a URL conforme necessário
    withCredentials: true, // Habilita o envio de cookies com as requisições
});

export default axiosInstance;
