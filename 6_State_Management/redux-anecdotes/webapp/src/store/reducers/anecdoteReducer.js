import { createSlice } from '@reduxjs/toolkit';
import anecdoteApi from '../../api/anecdote.axios';

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

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdoteApi.getAll()
		dispatch(anecdoteActions.setAnecdotes(anecdotes))
	}
}

export const newAnecdote = data => {
	return async dispatch => {
		const newAnecdote = await anecdoteApi.create(data)
		dispatch(anecdoteActions.addAnecdote(newAnecdote))
	}
}

export const voteAnecdote = id => {
	return async dispatch => {
		const anecdote = await anecdoteApi.getOne(id)
		const data = {
			...anecdote,
			votes: anecdote.votes + 1,
		}
		await anecdoteApi.updateOne(id, data)
		dispatch(anecdoteActions.increVote(id))
	}
}

export default anecdoteSlice.reducer;
