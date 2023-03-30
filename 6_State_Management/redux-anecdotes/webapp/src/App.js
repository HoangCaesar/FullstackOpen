// Project Import
import { AnecdoteForm, AnecdoteList, Filter, Notification } from './components';

// ==========================================|| APP ||==========================================

const App = () => {
    return (
        <div>
            <Filter />
            <Notification />
            <h2>Anecdotes</h2>
            <AnecdoteList />
            <AnecdoteForm />
        </div>
    );
};

export default App;
