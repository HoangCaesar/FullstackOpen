import { BASE_URL } from './constants.axios';
import axiosClient from './config.axios';

// ==========================================|| ANECDOTE API ||==========================================

const anecdoteApi = {
    getAll: () => {
        const url = `${BASE_URL}/anecdotes`;
        return axiosClient.get(url);
    },
    create: (data) => {
        const url = `${BASE_URL}/anecdotes`;
        return axiosClient.post(url, data);
    },
    updateOne: (data) => {
        const url = `${BASE_URL}/anecdotes/${data.id}`;
        return axiosClient.put(url, data);
    },
};

export default anecdoteApi;
