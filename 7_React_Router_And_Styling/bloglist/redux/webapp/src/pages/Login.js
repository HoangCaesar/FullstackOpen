import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authApi from '../api/authApi';
import { Notification, LoginForm } from '../components';
// import isAuthenticate from '../utils/authenticate';

// redux
import { useDispatch } from 'react-redux';
import { setNotificationTimeout } from '../store/reducers/notification.reducer';
import { userActions } from '../store/reducers/user.reducer';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = useCallback(async ({ username, password }) => {
        if (!(username && password)) {
            dispatch(
                setNotificationTimeout('Please enter both username and password', 'error', 5000)
            );
            return;
        }
        const user = {
            username,
            password,
        };
        try {
            dispatch(userActions.setUser(user));
            const res = await authApi.login(user);
            localStorage.setItem('token', res.token);
            navigate('/');
        } catch (error) {
            dispatch(setNotificationTimeout('Wrong credentials', 'error', 5000));
            return;
        }
    }, []);

    const handleCancel = useCallback((e) => {
        e.preventDefault();
        navigate('/');
    }, []);

    return (
        <>
            <h1>Login</h1>
            <Notification />
            <LoginForm onLogin={handleLogin} onCancel={handleCancel} />
        </>
    );
};

export default Login;
