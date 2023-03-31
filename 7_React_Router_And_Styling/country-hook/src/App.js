import React, { useState } from 'react';

// Project Import
import Country from './components/Country';
import { useCountry, useField } from './hooks';

// ==========================================|| COUNTRY API ||==========================================

const App = () => {
    const nameInput = useField('text');
    const [name, setName] = useState('');
    let country = useCountry(name);

    const onSearch = (e) => {
        e.preventDefault();
        setName(nameInput.value);
    };

    return (
        <div>
            <form onSubmit={onSearch}>
                <input {...nameInput} />
                <button>find</button>
            </form>

            <Country country={country} />
        </div>
    );
};

export default App;
