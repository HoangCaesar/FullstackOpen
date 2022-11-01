import { useState, memo } from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ onLogin, onCancel }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        onLogin({
            username,
            password,
        });
        setUsername('');
        setPassword('');
    };
    return (
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
            <button
                onClick={onCancel}
                style={{ padding: '4px 8px', margin: '10px 0 0 10px', cursor: 'pointer' }}
            >
                Cancel
            </button>
        </form>
    );
};

LoginForm.propTypes = {
    onLogin: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default memo(LoginForm);
