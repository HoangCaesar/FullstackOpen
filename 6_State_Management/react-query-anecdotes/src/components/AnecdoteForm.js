import { useMutation, useQueryClient } from 'react-query';
import anecdoteApi from '../api/anecdote.axios';
import { NotificationContext } from '../providers/NotiProvider';
import { useContext } from 'react';

const AnecdoteForm = () => {
    const context = useContext(NotificationContext);

    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation(anecdoteApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes');
        },
        onError: () => {
            context.dispatch({
                type: 'ERROR',
            });
            setTimeout(() => {
                context.dispatch({ type: 'HIDE' });
            }, 5000);
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate(
            { content, votes: 0 },
            {
                onError: () => {
                    context.dispatch({
                        type: 'ERROR',
                    });
                    setTimeout(() => {
                        context.dispatch({ type: 'HIDE' });
                    }, 5000);
                },
                onSuccess: () => {
                    context.dispatch({
                        type: 'SHOW',
                        data: `you created: '${content}'`,
                    });
                    setTimeout(() => {
                        context.dispatch({ type: 'HIDE' });
                    }, 5000);
                },
            }
        );
    };

    return (
        <div>
            <h3>Create new</h3>
            <form onSubmit={onCreate}>
                <input name="anecdote" />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default AnecdoteForm;
