import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userApi from '../api/userApi';
import isAuthenticate from '../utils/authenticate';
import isLogout from '../utils/logout';
import { Link } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { groupActions } from '../store/reducers/group.reducer';

const Users = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const userList = useSelector((state) => state.group);

    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);

    // Auth
    useEffect(() => {
        (async () => {
            const res = await isAuthenticate();
            if (res) {
                setLogout(res);
            }
        })();
    }, []);

    // Get user list
    useEffect(() => {
        (async () => {
            try {
                const res = await userApi.getAll();
                dispatch(groupActions.setgroup(res));
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const handleLogout = () => {
        isLogout(navigate);
        setLogout(false);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ marginRight: '10px' }}>Blogs</h2>
                <span style={{ marginRight: '10px' }}>{user?.username} has logged in</span>
                <Link
                    style={{
                        padding: '8px 16px',
                        color: 'black',
                        cursor: 'pointer',
                    }}
                    to="/users"
                >
                    Users Dashboard
                </Link>
                <Link
                    style={{
                        padding: '8px 16px',
                        color: 'black',
                        cursor: 'pointer',
                    }}
                    to="/blogs"
                >
                    Blogs List
                </Link>
                {logout ? (
                    <button onClick={handleLogout} style={{ height: '30px', cursor: 'pointer' }}>
                        Logout
                    </button>
                ) : (
                    <button style={{ height: '30px', cursor: 'pointer', textDecoration: 'none' }}>
                        <Link
                            style={{
                                padding: '8px 16px',
                                color: 'black',
                                textDecoration: 'none',
                                cursor: 'pointer',
                            }}
                            to="/login"
                        >
                            Login
                        </Link>
                    </button>
                )}
            </div>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                }}
            >
                <div>
                    <ul style={{ listStyleType: 'none' }}>
                        Users
                        {userList?.map((user) => (
                            <Link key={user.id} to={`/users/${user.id}`}>
                                <li>{user.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul style={{ listStyleType: 'none' }}>
                        Number of blogs
                        {userList?.map((user) => {
                            return <li key={user.id}>{user.blogs.length}</li>;
                        })}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Users;
