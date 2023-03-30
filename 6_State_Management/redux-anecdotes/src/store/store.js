// store
import { configureStore } from '@reduxjs/toolkit';

// Project Import
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';

// ==========================================|| STORE ||==========================================
const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        filter: filterReducer,
    },
});

export default store;
