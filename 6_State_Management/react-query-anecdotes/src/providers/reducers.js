const initialState = '';

const notificationReducer = (state, action) => {
    switch (action.type) {
        case 'SHOW':
            return action.data;
        case 'HIDE':
            return '';
        case 'ERROR':
            return 'Your text is too short, please give more than 5 letters!';
        default:
            return state;
    }
};

export { initialState };

export default notificationReducer;
