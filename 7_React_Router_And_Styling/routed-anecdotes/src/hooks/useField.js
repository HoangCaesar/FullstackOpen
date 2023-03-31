import { useState } from 'react';

// =====================================|| HOOKS: useField ||=====================================

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    const onReset = () => {
        setValue('');
    };

    return {
        type,
        value,
        onChange,
        onReset,
    };
};
