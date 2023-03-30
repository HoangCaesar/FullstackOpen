import { NEW_ANECDOTE, INCRE_VOTE } from './constants';

// ==========================================|| ANECDOTE ACTION ||==========================================
const anecdoteActions = {
    addNewAnecdote: (payload) => {
        return { type: NEW_ANECDOTE, payload };
    },
    increVote: (payload) => {
        return { type: INCRE_VOTE, payload };
    },
};

export { anecdoteActions };
