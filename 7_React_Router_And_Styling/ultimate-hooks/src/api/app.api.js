import { BASE_URL } from './constant.axios';
import axiosClient from './config.axios';

// ==========================================|| COUNTRY API ||==========================================

const appApi = {
    getInfo: (type) => {
        const url = `${BASE_URL}/${type}`;
        return axiosClient.get(url);
    },
    create: (type, resource) => {
        const url = `${BASE_URL}/${type}`;
        return axiosClient.post(url, resource);
    },
};

export default appApi;
