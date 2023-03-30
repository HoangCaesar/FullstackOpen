// Project Import
import { AnecdoteForm, AnecdoteList } from './components';

// ==========================================|| APP ||==========================================

const App = () => {
    return (
        <div>
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
