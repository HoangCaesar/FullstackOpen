import { useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notify from './components/Notify';
import FavBooks from './components/FavBooks';
import { useApolloClient } from '@apollo/client';

const App = () => {
    const [page, setPage] = useState('authors');
    const [token, setToken] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const client = useApolloClient()

    if (!token) {
        return (
            <div>
                <Notify errorMessage={errorMessage} />
                <h2>Login</h2>
                <LoginForm setToken={setToken} setError={setErrorMessage} />
            </div>
        );
    }

    const logout = () => {
      setToken(null)
      localStorage.clear()
      client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('fav')}>Your favourites</button>
            </div>
            <Notify errorMessage={errorMessage} />
            <button onClick={logout}>logout</button>

            <Authors show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} setPage={setPage} />

            <FavBooks show={page === 'fav'} />
        </div>
    );
};

export default App;
