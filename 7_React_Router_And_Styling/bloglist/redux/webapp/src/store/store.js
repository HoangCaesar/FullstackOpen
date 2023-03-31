import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './reducers/notification.reducer';
import blogsReducer from './reducers/blogs.reducer';
import userReducer from './reducers/user.reducer';
import groupReducer from './reducers/group.reducer';

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        blogs: blogsReducer,
        user: userReducer,
        group: groupReducer,
    },
});

export default store;
