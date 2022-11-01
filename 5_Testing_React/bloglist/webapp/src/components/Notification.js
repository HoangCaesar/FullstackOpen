import React from 'react';
import PropTypes from 'prop-types';

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

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default Notification;
