import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
    const notification = useSelector((state) => state.notification);

    let style = {
        paddingLeft: '10px',
        height: '40px',
        lineHeight: '40px',
        color: 'red',
        border: '5px solid red',
    };

    if (notification.type === 'success') {
        style = {
            paddingLeft: '10px',
            height: '40px',
            lineHeight: '40px',
            color: 'green',
            border: '5px solid green',
        };
    }

    return (
        <>
            {notification.message ? (
                <h3 className={`${notification.type}`} style={style}>
                    {notification.message}
                </h3>
            ) : (
                <div></div>
            )}
        </>
    );
};

export default Notification;
