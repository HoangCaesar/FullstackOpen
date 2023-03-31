import { Outlet } from 'react-router-dom';

// Project Import
import Header from './Header';
import Footer from './Footer';

// =====================================|| MAIN LAYOUT ||=====================================

const MainLayout = () => {
    return (
        <>
            <Header />
            <div style={{ marginTop: '150px' }}>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};

export default MainLayout;
