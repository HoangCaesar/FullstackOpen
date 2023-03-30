import { NEW_ANECDOTE, INCRE_VOTE, FILTER } from './constants';

// ==========================================|| ANECDOTE ACTION ||==========================================
const anecdoteActions = {
    addNewAnecdote: (payload) => {
        return { type: NEW_ANECDOTE, payload };
    },
    increVote: (payload) => {
        return { type: INCRE_VOTE, payload };
    },
};

// ==========================================|| FILTER ACTION ||==========================================

const filterActions = {
    filter: (payload) => {
        return { type: FILTER, payload };
    },
};

export { anecdoteActions, filterActions };
