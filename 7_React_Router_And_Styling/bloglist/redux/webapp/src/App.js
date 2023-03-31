import { Route, Routes } from 'react-router-dom';
import { Blogs, Login } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default App;
