import axios from 'axios';

// Project Import
import { BASE_URL } from './constants.axios';

// ==========================================|| AXIOS CONFIG ||==========================================

const axiosClient = axios.create({
    baseURL: BASE_URL,
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        console.log(error);
        return error;
    }
);

export default axiosClient;
