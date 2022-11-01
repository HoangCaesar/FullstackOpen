import axiosClient from './axiosClient'
import { BASE_URL } from './configApi';

const blogApi = {
    getAll: () => axiosClient.get(`${BASE_URL}/blogs`),
    getOne: (id) => axiosClient.get(`${BASE_URL}/blogs/${id}`),
    create: (params) => axiosClient.post(`${BASE_URL}/blogs`, params),
    update: (id, params) => axiosClient.put(`${BASE_URL}/blogs/${id}`, params),
    delete: (id) => axiosClient.delete(`${BASE_URL}/blogs/${id}`),
}

export default blogApi;
