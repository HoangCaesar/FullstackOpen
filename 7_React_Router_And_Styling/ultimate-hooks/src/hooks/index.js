import { useState, useEffect } from 'react';

// Project Import
import appApi from '../api/app.api';

// =====================================|| HOOKS ||=====================================

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

export const useResource = (type) => {
    const [resources, setResources] = useState([]);

    useEffect(() => {
        (async () => {
            const res = await appApi.getInfo(type);
            setResources(res);
        })();
    }, [type]);

    const create = async (resource) => {
        const res = await appApi.create(type, resource);
        return res;
    };

    const service = {
        create,
    };

    return [resources, service];
};
