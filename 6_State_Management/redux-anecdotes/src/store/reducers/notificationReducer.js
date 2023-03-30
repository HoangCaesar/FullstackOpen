import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

// ==========================================|| NOTIFICATION REDUCER ||==========================================

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload;
        },
        removeNotification: (state, action) => {
            return initialState;
        },
    },
});

export const notificationActions = notificationSlice.actions;
export default notificationSlice.reducer;
