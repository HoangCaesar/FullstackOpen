// store
import { configureStore } from '@reduxjs/toolkit';

// Project Import
import anecdoteReducer from './reducers/anecdoteReducer';
import filterReducer from './reducers/filterReducer';
import notificationReducer from './reducers/notificationReducer';

// ==========================================|| STORE ||==========================================
const store = configureStore({
    reducer: {
        anecdote: anecdoteReducer,
        filter: filterReducer,
        notification: notificationReducer
    },
});

export default store;
