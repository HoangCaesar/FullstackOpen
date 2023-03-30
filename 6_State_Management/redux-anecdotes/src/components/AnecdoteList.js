import { useSelector, useDispatch } from 'react-redux';

// Project Import
import { anecdoteActions } from '../store/reducers/actions';

// ==========================================|| ANECDOTE LIST ||==========================================

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state.anecdote);

    const vote = (id) => {
        dispatch(anecdoteActions.increVote(id));
    };

    return (
        <>
            {anecdotes?.map((anecdote) => (
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
