import axiosClient from './axiosClient'
import { BASE_URL } from './configApi';

const blogApi = {
    getAll: () => axiosClient.get(`${BASE_URL}/blogs`),
    create: (params) => axiosClient.post(`${BASE_URL}/blogs`, params),
}

export default blogApi;
