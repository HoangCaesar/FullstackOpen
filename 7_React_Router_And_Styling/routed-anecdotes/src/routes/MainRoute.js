// Project Import
import MainLayout from '../layout/MainLayout';
import AnecdoteList from '../pages/AnecdoteList';
import About from '../pages/About';
import AnecdoteForm from '../pages/AnecdoteForm';
import Anecdote from '../pages/Anecdote';

// =====================================|| MAIN LAYOUT ||=====================================

const MainRoute = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <About />,
        },
        {
            path: '/about',
            element: <About />,
        },
        {
            path: '/list/:id',
            element: <Anecdote />,
        },
        {
            path: '/list',
            element: <AnecdoteList />,
        },
        {
            path: '/create-form',
            element: <AnecdoteForm />,
        },
    ],
};

export default MainRoute;
