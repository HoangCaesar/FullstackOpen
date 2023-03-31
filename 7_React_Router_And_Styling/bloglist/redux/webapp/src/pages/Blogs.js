import { useEffect, useState, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import blogApi from '../api/blogApi';
import { AddBlogForm, Blog, Togglable } from '../components';
import isAuthenticate from '../utils/authenticate';
import { Notification } from '../components';
import isLogout from '../utils/logout';
import { Link } from 'react-router-dom';

// redux
// eslint-disable-next-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { setNotificationTimeout } from '../store/reducers/notification.reducer';
import { blogsActions } from '../store/reducers/blogs.reducer';

const Blogs = () => {
    const dispatch = useDispatch();
    const blogs = useSelector((state) => state.blogs);
    const user = useSelector((state) => state.user);

    const navigate = useNavigate();
    const [logout, setLogout] = useState(false);

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
                dispatch(blogsActions.setBlogs(res));
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    // ADDBLOG-FORM
    const handleAdd = useCallback(async ({ title, author, url }) => {
        if (!(title && author && url)) {
            dispatch(setNotificationTimeout('Please enter both title and author', 'error', 5000));
        }
        const blog = {
            title,
            author,
            url,
        };
        try {
            addBlogFormRef.current.toggleVisibility();
            await blogApi.create(blog);
            dispatch(setNotificationTimeout('Create a blog successfully', 'success', 5000));
        } catch (error) {
            dispatch(
                setNotificationTimeout(
                    'Invalid information or you need to login (Note: Maybe your title/author has less than 5 characters)!',
                    'error',
                    5000
                )
            );
        }
    }, []);

    // BLOG: +like/delete
    const handleLike = useCallback(async (blog) => {
        try {
            const updatedBlog = { ...blog, likes: blog.likes + 1 };
            await blogApi.update(blog.id, updatedBlog);
            dispatch(setNotificationTimeout(`You liked post: ${blog.title}`, 'success', 5000));
        } catch (err) {
            console.log(err);
        }
    }, []);

    const handleDelete = useCallback(async (blog) => {
        try {
            await blogApi.delete(blog.id);
            dispatch(setNotificationTimeout(`You deleted post: ${blog.title}`, 'success', 5000));
        } catch (err) {
            console.log(err);
        }
    }, []);

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

            <Notification />
            {blogs && (
                <ul style={{ padding: 0 }}>
                    {blogs
                        // .sort((a, b) => {
                        //     return b.likes - a.likes;
                        // })
                        .map((blog) => (
                            <Blog
                                key={blog.id}
                                blog={blog}
                                onLike={handleLike}
                                onDelete={handleDelete}
                            />
                        ))}
                </ul>
            )}

            <Togglable buttonLabel="Create New Blog" ref={addBlogFormRef}>
                <AddBlogForm onAdd={handleAdd} />
            </Togglable>
        </>
    );
};

export default Blogs;
