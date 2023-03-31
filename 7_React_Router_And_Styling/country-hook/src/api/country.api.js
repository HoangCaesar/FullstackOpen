import { BASE_URL } from './constant.axios';
import axiosClient from './config.axios';

// ==========================================|| COUNTRY API ||==========================================

const countryApi = {
    getCountries: (name) => {
        const url = `${BASE_URL}/${name}`;
        return axiosClient.get(url);
    },
};

export default countryApi;
