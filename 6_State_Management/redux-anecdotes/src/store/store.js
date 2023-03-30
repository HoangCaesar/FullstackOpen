// store
import { configureStore } from '@reduxjs/toolkit';

// Project Import
import anecdoteReducer from './reducers/anecdoteReducer';

// ==========================================|| STORE ||==========================================
const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
    },
});

export default store;
