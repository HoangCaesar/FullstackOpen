import React from 'react';

const Notification = ({ message, type }) => {
    let style = {
        paddingLeft: '10px',
        height: '40px',
        lineHeight: '40px',
        color: 'red',
        border: '5px solid red',
    };

    if (type === 'success') {
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
            <h3 style={style}>{message}</h3>
        </>
    );
};

export default Notification;
