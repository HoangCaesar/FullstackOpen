import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Project Import
import { demo_data } from '../data/demo_data';
import Notification from '../components/Notification';

// Style
const style = {
    paddingRight: 15,
    color: 'black',
};
// =====================================|| ANECDOTE LIST ||=====================================

const AnecdoteList = () => {
    const [anecdotes, setAnecdotes] = useState(demo_data);
    const [notification, setNotification] = useState(localStorage.getItem('noti'));
    
    useEffect(() => {
        setTimeout(() => {
            localStorage.removeItem('noti');
            setNotification(null);
        }, 5000);
    }, []);

    return (
        <div>
            {!!notification && <Notification message={notification} />}
            <h2>Anecdotes</h2>
            <ul>
                {anecdotes.map((anecdote) => (
                    <li key={anecdote.id}>
                        <Link to={`/list/${anecdote.id}`} style={style}>
                            {anecdote.content}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnecdoteList;
