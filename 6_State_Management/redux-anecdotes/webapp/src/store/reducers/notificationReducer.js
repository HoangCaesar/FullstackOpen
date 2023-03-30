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

export const setNotificationTime = (notification, time) => {
    return async (dispatch) => {
        dispatch(notificationActions.setNotification(notification));
        setTimeout(() => {
            dispatch(notificationActions.removeNotification());
        }, time * 500);
    };
};

export default notificationSlice.reducer;
