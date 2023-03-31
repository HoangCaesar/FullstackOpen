import { useState, useEffect } from 'react';

// Project Import
import countryApi from '../api/country.api';

// =====================================|| HOOKS ||=====================================

export const useField = (type) => {
    const [value, setValue] = useState('');

    const onChange = (event) => {
        setValue(event.target.value);
    };

    return {
        type,
        value,
        onChange,
    };
};

export const useCountry = (name) => {
    const [country, setCountry] = useState(null);

    useEffect(() => {
        try {
            if (name) {
                (async () => {
                    const res = await countryApi.getCountries(name);
                    if (res?.[0]?.flag) {
                        setCountry({
                            found: true,
                            data: res?.[0],
                        });
                        return;
                    }
                    setCountry({
                        found: false,
                    });
                })();
            }
        } catch (err) {
            console.log(err);
        }
    }, [name]);
    return country;
};
