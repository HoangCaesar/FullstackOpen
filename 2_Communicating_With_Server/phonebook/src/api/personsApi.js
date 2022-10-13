import axios from 'axios'
const BASE_URL = 'http://localhost:3001/persons';

const notesApi = {
    getAll: () => axios.get(`${BASE_URL}`).then(res => res.data),
    addNote: (note) => axios.post(`${BASE_URL}`, note).then(res => res.data),
    deleteNote: (id) => axios.delete(`${BASE_URL}/${id}`),
    updateNote: (note) => axios.put(`${BASE_URL}/${note.id}`, note)
}

export default notesApi;

