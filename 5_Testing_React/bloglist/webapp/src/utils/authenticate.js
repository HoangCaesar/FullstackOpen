import authApi from '../api/authApi';

const isAuthenticate = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        await authApi.checkToken();
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
};

export default isAuthenticate;
