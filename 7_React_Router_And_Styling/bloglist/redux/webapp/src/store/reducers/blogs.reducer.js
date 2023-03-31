import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {
        setBlogs: (state, action) => {
            return action.payload;
        },
        addBlog: (state, action) => {
            return [...state, action.payload];
        },
    },
});

export const blogsActions = blogsSlice.actions;
export default blogsSlice.reducer;
