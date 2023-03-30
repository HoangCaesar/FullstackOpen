import { useMutation, useQueryClient } from 'react-query';
import anecdoteApi from '../api/anecdote.axios';

const AnecdoteForm = () => {
    const queryClient = useQueryClient();

    const newAnecdoteMutation = useMutation(anecdoteApi.create, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes');
        },
    });

    const onCreate = (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        newAnecdoteMutation.mutate({ content, votes: 0 })
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
