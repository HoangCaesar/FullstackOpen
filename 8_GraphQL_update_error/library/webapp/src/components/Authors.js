import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries';

const Authors = ({ show }) => {
    const authors = useQuery(ALL_AUTHORS);

    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const [editAuthor, result] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    });

    useEffect(() => {
        if (result.data && result.data.editAuthor === null) {
            console.log('This author does not exist!');
        }
    }, [result.data]);

    if (!show) {
        return null;
    }

    if (authors.loading) {
        return <div>loading...</div>;
    }

    const options = authors.data.allAuthors.map((author) => {
        return { value: author.name, label: author.name };
    });

    const handleBirth = async (event) => {
        event.preventDefault();

        editAuthor({ variables: { name, setBornTo: Number(born) } });

        setName('');
        setBorn('');
    };

    return (
        <div>
            <h2>authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.data.allAuthors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Set Birth Year</h2>
            <form onSubmit={handleBirth}>
                <div>
                    name
                    <Select
                        options={options}
                        isClearable={true}
                        isSearchable={true}
                        name="name"
                        onChange={({ value }) => setName(value)}
                    />
                </div>
                <div>
                    born
                    <input
                        type="number"
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">update author</button>
            </form>
        </div>
    );
};

export default Authors;
