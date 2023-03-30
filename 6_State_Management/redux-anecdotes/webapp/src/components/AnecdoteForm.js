import { useDispatch, useSelector } from 'react-redux';

// Project Import
import { newAnecdote } from '../store/reducers/anecdoteReducer';
import { setNotificationTime } from '../store/reducers/notificationReducer';

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

    const addNote = async (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        const data = {
            content,
            votes: 0,
            id: generateId(),
        };
        dispatch(newAnecdote(data));
        dispatch(setNotificationTime(`you created the Anecdote: '${content}'`, 10));
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
