// Project Import
import { AnecdoteForm, AnecdoteList, Filter } from './components';

// ==========================================|| APP ||==========================================

const App = () => {
    return (
        <div>
            <Filter />
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
