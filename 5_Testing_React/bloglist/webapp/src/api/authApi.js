import axiosClient from './axiosClient'
import { BASE_URL } from './configApi';

const authApi = {
    login: (params) => axiosClient.post(`${BASE_URL}/login`, params),
    checkToken: () => axiosClient.post(`${BASE_URL}/login/check-token`),
}

export default authApi;
