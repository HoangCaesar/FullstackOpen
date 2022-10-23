import axios from 'axios'
import queryString from 'query-string';
const BASE_URL = '/api/persons';

const axiosClient = axios.create({
    baseUrl: BASE_URL,
    paramsSerializer: (params) => queryString.stringify({ params }),
});

axiosClient.interceptors.request.use((config) => {
    return {
        ...config,
        headers: {
            'Access-Control-Allow-Origin': "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "origin, content-type, accept, x-requested-with",
            "Access-Control-Max-Age": "3600",
            'Content-Type': 'application/json'
        },
    };
});

const notesApi = {
    getAll: () => axiosClient.get(`${BASE_URL}`).then(res => res.data),
    addNote: (note) => axiosClient.post(`${BASE_URL}`, note).then(res => res.data),
    deleteNote: (id) => axiosClient.delete(`${BASE_URL}/${id}`),
    updateNote: (note) => axiosClient.put(`${BASE_URL}/${note.id}`, note)
}

export default notesApi;

