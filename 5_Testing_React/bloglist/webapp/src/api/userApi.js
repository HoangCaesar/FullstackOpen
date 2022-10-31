import axiosClient from './axiosClient'
import { BASE_URL } from './configApi';

const userApi = {
    getAll: () => axiosClient.get(`${BASE_URL}/users`)
}

export default userApi;
