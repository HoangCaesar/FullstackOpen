const isLogout = (navigate) => {
    localStorage.removeItem('token');
    navigate('/login');
};

export default isLogout;
