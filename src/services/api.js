import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/items', // адрес json-server
});

export default api;
