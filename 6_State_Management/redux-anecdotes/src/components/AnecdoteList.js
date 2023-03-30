import { useSelector, useDispatch } from 'react-redux';

// Project Import
import { anecdoteActions } from '../store/reducers/anecdoteReducer';

// ==========================================|| ANECDOTE LIST ||==========================================

const AnecdoteList = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state.anecdote);
    const filter = useSelector((state) => state.filter);

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
