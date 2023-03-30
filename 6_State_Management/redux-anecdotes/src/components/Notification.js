import { useSelector } from 'react-redux';

// ==========================================|| NOTIFICATION ||==========================================

const Notification = () => {
    const notification = useSelector((state) => state.notification);

    const style = {
        margin: '10px',
        border: 'solid',
        padding: 10,
        borderWidth: 1,
    };
    return notification && <div style={style}>{notification}</div>;
};

export default Notification;
