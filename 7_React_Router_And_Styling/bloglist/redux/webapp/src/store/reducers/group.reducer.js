import { createSlice } from '@reduxjs/toolkit';

const groupSlice = createSlice({
    name: 'group',
    initialState: [],
    reducers: {
        setgroup: (state, action) => action.payload,
    },
});

export const groupActions = groupSlice.actions;
export default groupSlice.reducer;
