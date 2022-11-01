import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import { Notification, LoginForm } from '../components';
// import isAuthenticate from '../utils/authenticate';

const Login = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);


    // useEffect(() => {
    //     (async () => {
    //         const res = await isAuthenticate();
    //         if (res) navigate('/');
    //     })();
    // }, []);
    const handleLogin = useCallback(async ({ username, password }) => {
        if (!(username && password)) {
            setErrorMessage('Please enter both username and password');
            return setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
        const user = {
            username,
            password,
        };
        try {
            const res = await authApi.login(user);
            localStorage.setItem('token', res.token);
            navigate('/');
        } catch (error) {
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }, []);

    const handleCancel = useCallback((e) => {
        e.preventDefault();
        navigate('/');
    }, []);

    return (
        <>
            <h1>Login</h1>
            {errorMessage && <Notification message={errorMessage} />}
            <LoginForm
                onLogin={handleLogin}
                onCancel={handleCancel}
            />
        </>
    );
};

export default Login;
