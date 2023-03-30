import { createSlice } from '@reduxjs/toolkit';

// Set up
const initialState = [];

const compareVotes = (a, b) => {
    return b.votes - a.votes;
};

// ==========================================|| ANECDOTE REDUCER ||==========================================

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        increVote: (state, action) => {
            const id = action.payload;
            const anecdoteIndex = state.findIndex((anecdote) => anecdote.id === id);
            state[anecdoteIndex].votes += 1;
            state.sort(compareVotes);
            return state;
        },
        addAnecdote: (state, action) => {
            state.push(action.payload);
        },
        setAnecdotes: (state, action) => {
            return action.payload;
        },
    },
});

export const anecdoteActions = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
