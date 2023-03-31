import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        };
    });
    return (
        <div>
            <div style={hideWhenVisible} className="togglableView">
                <button
                    onClick={toggleVisibility}
                    style={{ padding: '4px 8px', cursor: 'pointer' }}
                    className='viewBtn'
                >
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible} className="togglableContent">
                {children}
                <button
                    onClick={toggleVisibility}
                    style={{ padding: '4px 8px', cursor: 'pointer' }}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
});

Togglable.displayName = 'Togglable';

Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
};

export default Togglable;
