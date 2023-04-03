const Notify = ({ errorMessage }) => {
    return (
        <div>
            <h4 style={{ color: 'red' }}>{errorMessage}</h4>
        </div>
    );
};

export default Notify;
