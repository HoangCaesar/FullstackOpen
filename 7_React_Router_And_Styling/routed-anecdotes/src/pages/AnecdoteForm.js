import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Project Import
import { demo_data } from '../data/demo_data';

// =====================================|| ANECDOTE FORM ||=====================================

const AnecdoteForm = () => {
    const navigate = useNavigate();

    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [info, setInfo] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        demo_data.push({
            content,
            author,
            info,
            votes: 0,
            id: demo_data.length + 1,
        });
        localStorage.setItem('noti', `A new anecdote is created: ${
            demo_data[demo_data.length - 1].content
        } by ${demo_data[demo_data.length - 1].author}`)
        navigate('/list')
    };

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: '10px' }}>
                    content &nbsp;
                    <input
                        name="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    author &nbsp;
                    <input
                        name="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </div>
                <div style={{ marginTop: '10px' }}>
                    url for more info &nbsp;
                    <input name="info" value={info} onChange={(e) => setInfo(e.target.value)} />
                </div>
                <button style={{ marginTop: '10px' }}>Create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
