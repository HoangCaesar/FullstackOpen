import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';
import { AddBlogForm, Blog, Togglable } from '../components';
import isAuthenticate from '../utils/authenticate';
import { Notification } from '../components';
import isLogout from '../utils/logout';
import { Link } from 'react-router-dom';

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);
    const [logout, setLogout] = useState(false);

    const [infoMessage, setInfoMessage] = useState(null);
    const [typeMessage, setTypeMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const addBlogFormRef = useRef();

    // AUTHENTICATION: Login+Logout
    useEffect(() => {
        (async () => {
            const res = await isAuthenticate();
            if (res) {
                setLogout(res);
            }
        })();
    }, []);

    const handleLogout = () => {
        isLogout(navigate);
        setLogout(false);
    };

    // GET: Bloglist
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

    // ADDBLOG-FORM
    const handleAdd = useCallback(async ({ title, author, url }) => {
        if (!(title && author && url)) {
            setErrorMessage('Please enter both title and author');
            return setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
        const blog = {
            title,
            author,
            url,
        };
        try {
            addBlogFormRef.current.toggleVisibility();
            await blogApi.create(blog);
            handleInfoMessage(['Create a blog successfully', 'success']);
        } catch (error) {
            setErrorMessage(
                'Invalid information or you need to login (Note: Maybe your title/author has less than 5 characters)!'
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    }, []);

    const handleInfoMessage = (info) => {
        setInfoMessage(info[0]);
        setTypeMessage(info[1]);
        setTimeout(() => {
            setInfoMessage(null);
        }, 5000);
    };

    // BLOG: +like/delete
    const handleLike = useCallback(async (blog) => {
        try {
            blog.likes = blog.likes + 1;
            await blogApi.update(blog.id, blog);
            handleInfoMessage([`You liked post: ${blog.title}`, 'success']);
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleDelete = useCallback(async (blog) => {
        try {
            await blogApi.delete(blog.id);
            handleInfoMessage([`You deleted post: ${blog.title}`, 'success']);
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <h2 style={{ marginRight: '10px' }}>Blogs</h2>
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

            {infoMessage && <Notification message={infoMessage} type={typeMessage} />}
            <ul style={{ padding: 0 }}>
                {blogs
                    .sort((a, b) => {
                        return b.likes - a.likes;
                    })
                    .map((blog) => (
                        <Blog
                            key={blog.id}
                            blog={blog}
                            onLike={handleLike}
                            onDelete={handleDelete}
                        />
                    ))}
            </ul>

            <Togglable buttonLabel="Create New Blog" ref={addBlogFormRef}>
                <AddBlogForm errorMessage={errorMessage} onAdd={handleAdd} />
            </Togglable>
        </>
    );
};

export default Blogs;
