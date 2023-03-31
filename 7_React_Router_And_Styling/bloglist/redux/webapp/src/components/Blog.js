import Togglable from './Togglable';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Blog = ({ blog, onLike, onDelete }) => {
    const navigate = useNavigate();

    const handleLike = () => {
        onLike(blog);
    };

    const handleDelete = () => {
        onDelete(blog);
    };

    const handleBlogDetails = () => {
        navigate(`/blogs/${blog.id}`);
    };

    return (
        <li
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '20px 0',
                border: '1px solid black',
            }}
            className="blog"
        >
            <p
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '10px',
                }}
            >
                Title: {blog.title}
            </p>
            <Togglable buttonLabel="view">
                <h4 style={{ marginRight: '10px' }}>Author: {blog.author}</h4>
                <h4 style={{ marginRight: '10px' }}>URL: {blog.url}</h4>
                <h4 id="like-h4" style={{ marginRight: '10px' }}>
                    Likes: {blog.likes}
                    <button onClick={handleLike} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                        like
                    </button>
                </h4>
                <button
                    id="#delete-button"
                    onClick={handleDelete}
                    style={{ marginRight: '10px', padding: '4px 8px', cursor: 'pointer' }}
                >
                    Delete
                </button>
                <button
                    onClick={handleBlogDetails}
                    style={{ marginRight: '10px', padding: '4px 8px', cursor: 'pointer' }}
                >
                    View Details
                </button>
            </Togglable>
        </li>
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    // onLike: PropTypes.func.isRequired,
    // onDelete: PropTypes.func.isRequired,
};

export default Blog;
