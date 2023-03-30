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
        <div className="formDiv">
            {errorMessage && <Notification message={errorMessage} />}
            <form onSubmit={handleAdd}>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Title</span>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                        placeholder="write title of blog here"
                        // className='inputAddForm'
                    />
                </div>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Author</span>
                    <input
                        id="author"
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                        placeholder="write author of blog here"
                        // className='inputAddForm'
                    />
                </div>
                <div style={{ width: '100%', height: '30px', marginTop: '10px' }}>
                    <span style={{ marginRight: '20px' }}>Url</span>
                    <input
                        id="url"
                        type="text"
                        value={url}
                        name="Url"
                        onChange={({ target }) => setUrl(target.value)}
                        placeholder="write url of blog here"
                        // className='inputAddForm'
                    />
                </div>
                <button
                    id="create-button"
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
    onAdd: PropTypes.func.isRequired,
};

export default memo(AddBlogForm);
