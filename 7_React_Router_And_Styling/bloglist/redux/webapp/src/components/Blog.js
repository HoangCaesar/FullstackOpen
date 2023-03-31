import Togglable from './Togglable';
import PropTypes from 'prop-types';

const Blog = ({ blog, onLike, onDelete }) => {

    const handleLike = () => {
        onLike(blog);
    };

    const handleDelete = () => {
        onDelete(blog);
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
