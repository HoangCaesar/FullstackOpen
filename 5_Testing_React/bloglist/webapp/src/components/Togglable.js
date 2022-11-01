import { useState, forwardRef, useImperativeHandle } from 'react';

const Togglable = ({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? 'none' : '' };
    const showWhenVisible = { display: visible ? '' : 'none' };

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility
        };
    });
    return (
        <div>
            <div style={hideWhenVisible}>
                <button
                    onClick={toggleVisibility}
                    style={{ padding: '4px 8px', cursor: 'pointer' }}
                >
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
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
};

export default forwardRef(Togglable);
