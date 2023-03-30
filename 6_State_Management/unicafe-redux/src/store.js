// store
import { configureStore } from '@reduxjs/toolkit';

// Project Import
import { counterReducer } from './reducers';

// ==========================================|| STORE ||==========================================
const store = configureStore({
    reducer: {
        counter: counterReducer,
    },
});

export default store;
