import { createSlice } from '@reduxjs/toolkit';

const initialState = ['', 'success'];

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            return action.payload;
        },
        clearNotification: () => {
            return initialState;
        },
    },
});

const notificationActions = notificationSlice.actions;

export const setNotificationTimeout = (message, type, timeout) => {
    return async (dispatch) => {
        dispatch(notificationActions.setNotification({ message, type }));
        setTimeout(() => {
            dispatch(notificationActions.clearNotification());
        }, timeout);
    };
};

export { notificationActions };
export default notificationSlice.reducer;
