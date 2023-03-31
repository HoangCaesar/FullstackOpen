import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Project Import
import { demo_data } from '../data/demo_data';
import { useField } from '../hooks/useField';

// =====================================|| ANECDOTE FORM ||=====================================

const AnecdoteForm = () => {
    const navigate = useNavigate();

    const content = useField('text');
    const author = useField('text');
    const info = useField('text');

    const handleSubmit = (e) => {
        e.preventDefault();
        demo_data.push({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0,
            id: demo_data.length + 1,
        });
        localStorage.setItem(
            'noti',
            `A new anecdote is created: ${demo_data[demo_data.length - 1].content} by ${
                demo_data[demo_data.length - 1].author
            }`
        );
        navigate('/list');
    };

    const handleReset = () => {
        content.onReset();
        author.onReset();
        info.onReset();
    };

    return (
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ marginTop: '10px' }}>
                    content &nbsp;
                    <input name="content" {...content} />
                </div>
                <div style={{ marginTop: '10px' }}>
                    author &nbsp;
                    <input name="author" {...author} />
                </div>
                <div style={{ marginTop: '10px' }}>
                    url for more info &nbsp;
                    <input name="info" {...info} />
                </div>
                <button style={{ marginTop: '10px' }}>Create</button>
                <button type="reset" onClick={handleReset}>
                    Clear
                </button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
