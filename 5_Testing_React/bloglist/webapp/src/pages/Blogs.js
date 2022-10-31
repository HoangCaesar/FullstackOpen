import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';
import { AddBlog, Blog } from '../components';
import isAuthenticate from '../utils/authenticate';
import isLogout from '../utils/logout';
import { Notification } from '../components';

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [logout, setLogout] = useState(false);
    const [addition, setAddition] = useState(false);

    const [infoMessage, setInfoMessage] = useState(null);
    const [typeMessage, setTypeMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await isAuthenticate();
            if (!res) return navigate('/login');
            else {
                setLogout(res);
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            try {
                const res = await blogApi.getAll();
                setBlogs(res);
            } catch (err) {
                console.log(err);
            }
        })();
    }, [infoMessage]);

    const handleLogout = () => {
        isLogout(navigate);
        setLogout(false);
    };

    const handleAdd = () => {
        setAddition((prev) => !prev);
    };

    const handleInfoMessage = (info) => {
        setInfoMessage(info[0]);
        setTypeMessage(info[1]);
        setTimeout(() => {
            setInfoMessage(null);
        }, 5000);
    };

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '10px' }}>Blogs</h2>
                {logout && (
                    <button onClick={handleLogout} style={{ height: '30px', cursor: 'pointer' }}>
                        Logout
                    </button>
                )}
            </div>
            {infoMessage && <Notification message={infoMessage} type={typeMessage} />}
            {blogs?.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '10px' }}>Create A New Blog</h2>
                {addition ? (
                    <button onClick={handleAdd} style={{ height: '30px', cursor: 'pointer' }}>
                        Close Form
                    </button>
                ) : (
                    <button onClick={handleAdd} style={{ height: '30px', cursor: 'pointer' }}>
                        Open Form
                    </button>
                )}
            </div>
            {addition && <AddBlog handleInfoMessage={handleInfoMessage} />}
        </>
    );
};

export default Blogs;
