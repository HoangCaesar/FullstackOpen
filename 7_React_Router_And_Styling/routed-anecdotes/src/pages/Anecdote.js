import { useLocation } from 'react-router-dom';

// Project Import
import { demo_data } from '../data/demo_data';

// =====================================|| ANECDOTE LIST ||=====================================
// /list/1

const Anecdote = () => {
    const location = useLocation();
    const id = Number(location.pathname.split('/')[2]);
    const anecdote = demo_data[id - 1];

    return (
        <div>
            <h1>{anecdote.content}</h1>
            <p>has {anecdote.votes} votes</p>
        </div>
    );
};

export default Anecdote;
