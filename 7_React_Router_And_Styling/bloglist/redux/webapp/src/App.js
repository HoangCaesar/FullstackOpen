import { Route, Routes } from 'react-router-dom';
import { Blogs, Login, Users, User, Blog } from './pages';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/blogs/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    );
};

export default App;
