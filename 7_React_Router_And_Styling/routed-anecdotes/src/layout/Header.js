import { Link } from 'react-router-dom';

// =====================================|| HEADER ||=====================================

const Header = () => {
    const padding = {
        paddingRight: 15,
        color: 'black',
    };
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                padding: 10,
                width: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
            }}
        >
            <h1>
                <Link to="/" style={(padding, { textDecoration: 'none' })}>
                    Software anecdotes
                </Link>
            </h1>
            <Link to="/list" style={padding}>
                Anecdotes List
            </Link>
            <Link to="/create-form" style={padding}>
                Create A New Anecdotes
            </Link>
            <Link to="/about" style={padding}>
                About Anecdotes
            </Link>
        </div>
    );
};

export default Header;
