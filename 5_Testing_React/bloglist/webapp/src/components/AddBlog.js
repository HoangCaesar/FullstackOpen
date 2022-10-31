import { useState } from 'react';
import Notification from './Notification';
import blogApi from '../api/blogApi';

const AddBlog = ({ handleInfoMessage }) => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleAdd = async (event) => {
        event.preventDefault();
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
            await blogApi.create(blog);
            setTitle('');
            setAuthor('');
            setUrl('');
            handleInfoMessage(['Create a blog successfully', 'success']);
        } catch (error) {
            setErrorMessage(
                'Invalid information (Note: Maybe your title/author has less than 5 characters)!'
            );
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    return (
        <div>
            {errorMessage && <Notification message={errorMessage}/>}
            <form onSubmit={handleAdd}>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Title</span>
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Author</span>
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Url</span>
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button
                    type="submit"
                    style={{ padding: '4px 8px', marginTop: '10px', cursor: 'pointer' }}
                >
                    Create
                </button>
            </form>
        </div>
    );
};

export default AddBlog;
