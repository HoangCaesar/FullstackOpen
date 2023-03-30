import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// Project Import
import App from './App';
import store from './store/store';

// ==========================================|| INDEX ||==========================================
ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <App />
    </Provider>
);
