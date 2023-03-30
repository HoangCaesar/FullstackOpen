import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Project Import
import { anecdoteActions } from '../store/reducers/anecdoteReducer';
import anecdoteApi from '../api/anecdote.axios';

// ==========================================|| ANECDOTE LIST ||==========================================

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state.anecdote);
    const filter = useSelector((state) => state.filter);

    useEffect(() => {
        (async () => {
            const list = await anecdoteApi.getAll();
            dispatch(anecdoteActions.setAnecdotes(list));
        })();
    }, []);

    const vote = (id) => {
        dispatch(anecdoteActions.increVote(id));
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
