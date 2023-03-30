import { NotificationContext } from '../providers/NotiProvider';
import { useContext } from 'react';

const Notification = () => {
    const context = useContext(NotificationContext);

    const style = {
        border: 'solid',
        padding: 10,
        borderWidth: 1,
        marginBottom: 5,
    };

    return context.notification && <div style={style}>{context.notification}</div>;
};

export default Notification;
