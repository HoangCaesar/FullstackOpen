import { createSlice } from '@reduxjs/toolkit';

// ==========================================|| FILTER SLICE ||==========================================

const initialState = '';

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        filter: (state, action) => {
            return action.payload;
        },
    },
});

export const filterActions = filterSlice.actions;
export default filterSlice.reducer;
