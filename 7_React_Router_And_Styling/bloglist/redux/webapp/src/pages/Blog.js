import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';
import isAuthenticate from '../utils/authenticate';
import isLogout from '../utils/logout';
import { Link } from 'react-router-dom';

// redux
import { useSelector } from 'react-redux';

const Blog = () => {
    const user = useSelector((state) => state.user);

    const location = useLocation();
    const id = location.pathname.split('/')[2];

    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);
    const [blogProfile, setBlogProfile] = useState();

    // Auth
    useEffect(() => {
        (async () => {
            const res = await isAuthenticate();
            if (res) {
                setLogout(res);
            }
        })();
    }, []);

    // Get user
    useEffect(() => {
        (async () => {
            try {
                const res = await blogApi.getOne(id);
                setBlogProfile(res);
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
        <div>
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
            <div>
                <h2>
                    Blog name: <span>{blogProfile?.title}</span>
                </h2>
                <h3>Blog Info:</h3>
                <div>
                    <p>{blogProfile?.url}</p>
                    <p>{blogProfile?.likes} likes</p>
                    <p>added by {blogProfile?.author}</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
