import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import anecdoteApi from './api/anecdote.axios';
import { NotificationContext } from './providers/NotiProvider';
import { useContext } from 'react';

const App = () => {
    const context = useContext(NotificationContext);

    const queryClient = useQueryClient();
    const voteAnecdoteMutation = useMutation(anecdoteApi.updateOne, {
        onSuccess: () => {
            queryClient.invalidateQueries('anecdotes');
        },
    });

    const handleVote = (anecdote) => {
        console.log('vote');
        voteAnecdoteMutation.mutate(
            { ...anecdote, votes: anecdote.votes + 1 },
            {
                onSuccess: () => {
                    context.dispatch({
                        type: 'SHOW',
                        data: `You voted for: '${anecdote.content}'`,
                    });
                    setTimeout(() => {
                        context.dispatch({ type: 'HIDE' });
                    }, 5000);
                },
            }
        );
    };

    const {
        isLoading,
        isError,
        data: anecdotes,
    } = useQuery('anecdotes', anecdoteApi.getAll, {
        retry: 1,
    });
    if (isLoading) return <div>Loading data...</div>;

    if (isError) return <div>Anecote service not available due to problems in server</div>;

    return (
        <>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            <div style={{ marginTop: '30px' }}>
                {anecdotes.map((anecdote) => (
                    <div key={anecdote.id} style={{ marginTop: '15px' }}>
                        <div>{anecdote.content}</div>
                        <div>
                            has {anecdote.votes}
                            <button onClick={() => handleVote(anecdote)}>vote</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default App;
