import { createContext, useReducer } from 'react';
import notificationReducer, { initialState } from './reducers';

const NotificationContext = createContext();

const NotificationContextProvider = ({ children }) => {
    const [notification, dispatch] = useReducer(notificationReducer, initialState);

    return (
        <NotificationContext.Provider value={{ notification, dispatch }}>
            {children}
        </NotificationContext.Provider>
    );
};

export { NotificationContext };
export default NotificationContextProvider;
