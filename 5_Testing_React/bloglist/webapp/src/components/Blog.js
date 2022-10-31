const Blog = ({ blog }) => (
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}
    >
        <p style={{ marginRight: '10px' }}>Title: {blog.title}</p>
        <h4 style={{ marginRight: '10px' }}>Author: {blog.author}</h4>
    </div>
);

export default Blog;
