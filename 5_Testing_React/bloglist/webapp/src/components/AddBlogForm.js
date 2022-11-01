import { useState, memo } from 'react';
import Notification from './Notification';
import PropTypes from 'prop-types';

const AddBlogForm = ({ errorMessage, onAdd }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleAdd = (e) => {
        e.preventDefault();
        onAdd({ title, author, url });
        setTitle('');
        setAuthor('');
        setUrl('');
    };
    return (
        <div>
            {errorMessage && <Notification message={errorMessage} />}
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
                    style={{ padding: '4px 8px', margin: '10px 0', cursor: 'pointer' }}
                >
                    Create
                </button>
            </form>
        </div>
    );
};

AddBlogForm.propTypes = {
    errorMessage: PropTypes.string,
    onAdd: PropTypes.func.isRequired
};

export default memo(AddBlogForm);
