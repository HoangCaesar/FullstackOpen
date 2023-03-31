import axiosClient from './axiosClient';
import { BASE_URL } from './configApi';

const userApi = {
    getAll: () => axiosClient.get(`${BASE_URL}/users`),
    getOne: (id) => axiosClient.get(`${BASE_URL}/users/${id}`),
};

export default userApi;
