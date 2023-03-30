import { useSelector, useDispatch } from 'react-redux';

// Project Import
import { anecdoteActions } from '../store/reducers/anecdoteReducer';
import { notificationActions } from '../store/reducers/notificationReducer';

// ==========================================|| ANECDOTE FORM ||==========================================

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const anecdotes = useSelector((state) => state.anecdote);

    const generateId = () => {
        const id = (100000 * Math.random()).toFixed(0);
        const isIdExisted = anecdotes?.find((anecdote) => anecdote.id === id);
        if (!!isIdExisted) {
            generateId();
        }
        return id;
    };

    const addNote = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(notificationActions.setNotification(`Added a new anecdote: ${content}`));
        dispatch(
            anecdoteActions.addAnecdote({
                content,
                votes: 0,
                id: generateId(),
            })
        );
        setTimeout(() => {
            dispatch(notificationActions.removeNotification());
        }, 5000);
    };

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={addNote}>
                <div>
                    <input name="anecdote" />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
