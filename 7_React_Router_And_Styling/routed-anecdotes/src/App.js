// Project Import
import AppRoutes from './routes';

// =====================================|| APP ||=====================================

const App = () => {
    // const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

    // const vote = (id) => {
    //     const anecdote = anecdoteById(id);

    //     const voted = {
    //         ...anecdote,
    //         votes: anecdote.votes + 1,
    //     };

    //     setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
    // };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <AppRoutes />
        </div>
    );
};

export default App;
