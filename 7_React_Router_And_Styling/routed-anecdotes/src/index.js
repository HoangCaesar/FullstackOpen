import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

// Project Import
import App from './App';

// =====================================|| INDEX ||=====================================

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <App />
    </Router>
);
