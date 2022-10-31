import { useState, useEffect } from 'react';
import authApi from '../api/authApi';
import { Notification } from '../components';
import { useNavigate } from 'react-router-dom';
import isAuthenticate from '../utils/authenticate';

const Login = () => {
    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState(null);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        (async () => {
            const res = await isAuthenticate();
            if (res) navigate('/');
        })();
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
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
            setUsername('');
            setPassword('');
            navigate('/');
        } catch (error) {
            setErrorMessage('Wrong credentials');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <>
            <h1>Login</h1>
            {errorMessage && <Notification message={errorMessage} />}
            <form onSubmit={handleLogin}>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Username</span>
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Password</span>
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button
                    type="submit"
                    style={{ padding: '4px 8px', marginTop: '10px', cursor: 'pointer' }}
                >
                    Login
                </button>
            </form>
        </>
    );
};

export default Login;
