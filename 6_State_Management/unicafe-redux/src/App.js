import { useState } from 'react';

// Project Import
import store from './store';
import { initialState } from './reducers';

// ==========================================|| APP ||==========================================

const App = () => {
    const [counterState, setCounterState] = useState(initialState);

    const handleGood = () => {
        store.dispatch({ type: 'GOOD' });
        setCounterState(store.getState().counter);
    };

    const handleNeutral = () => {
        store.dispatch({ type: 'OK' });
        setCounterState(store.getState().counter);
    };

    const handleBad = () => {
        store.dispatch({ type: 'BAD' });
        setCounterState(store.getState().counter);
    };

    const handleReset = () => {
        store.dispatch({ type: 'ZERO' });
        setCounterState(store.getState().counter);
    };

    return (
        <div>
            <h1>give feedback</h1>
            <button onClick={handleGood}>good</button>
            <button onClick={handleNeutral}>neutral</button>
            <button onClick={handleBad}>bad</button>
            <button onClick={handleReset}>reset</button>

            <h1>statistics</h1>
            <h4>good: {counterState.good}</h4>
            <h4>ok: {counterState.ok}</h4>
            <h4>bad: {counterState.bad}</h4>
        </div>
    );
};

export default App;
