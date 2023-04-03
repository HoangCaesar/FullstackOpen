import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries';

const Books = ({ show }) => {
    const [genre, setGenre] = useState(null);
    const { data: bookData } = useQuery(ALL_BOOKS, {
        variables: { genre },
        skip: !genre,
    });

    const { data: allBookData } = useQuery(ALL_BOOKS, { genre: null });
    const allGenres = allBookData && [...allBookData.allBooks.map((book) => book.genres).flat()];
    let filteredGenres = [];
    allGenres?.forEach((genre) => {
        if (!filteredGenres.includes(genre)) {
            return filteredGenres.push(genre);
        }
    });

    const updateGenre = (genre) => {
        setGenre(genre);
    };

    const books = genre ? bookData && bookData.allBooks : allBookData && allBookData.allBooks;

    if (!show) {
        return null;
    }

    if (allBookData.loading) {
        return <div>loading...</div>;
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books?.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div>
                {filteredGenres &&
                    filteredGenres?.map((genre) => (
                        <button key={genre} onClick={() => updateGenre(genre)}>
                            {genre}
                        </button>
                    ))}
                <button onClick={() => updateGenre(null)}>all genres</button>
            </div>
        </div>
    );
};

export default Books;
