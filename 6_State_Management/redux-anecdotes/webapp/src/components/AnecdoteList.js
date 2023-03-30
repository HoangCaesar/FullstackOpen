import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Project Import
import { initializeAnecdotes, anecdoteActions ,voteAnecdote} from '../store/reducers/anecdoteReducer';

// ==========================================|| ANECDOTE LIST ||==========================================

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state.anecdote);
    const filter = useSelector((state) => state.filter);

    useEffect(() => {
        dispatch(initializeAnecdotes());
    }, []);

    const vote = (id) => {
        dispatch(voteAnecdote(id));
    };

    return (
        <>
            {anecdotes
                ?.filter((anecdote) => anecdote.content.includes(filter))
                ?.map((anecdote) => (
                    <div key={anecdote.id}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => vote(anecdote.id)}>vote</button>
                        </div>
                    </div>
                ))}
        </>
    );
};

export default AnecdoteList;
