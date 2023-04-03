import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';

const FavBooks = ({ show }) => {
    const meResult = useQuery(ME);

    const favoriteGenre = meResult.data && meResult.data.me && meResult.data.me.favoriteGenre;

    const result = useQuery(ALL_BOOKS, {
        variables: { genre: favoriteGenre },
    });

    if (!show) {
        return null;
    }

    const books = result.data && result.data.allBooks;

    return (
        <div>
            <h1>Your favourite books</h1>
            <h3>Type: {favoriteGenre}</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Book</th>
                        <th>Author</th>
                        <th>Published</th>
                    </tr>
                    {books &&
                        books.map((a) => (
                            <tr key={a.title}>
                                <td>{a.title}</td>
                                <td>{a.author.name}</td>
                                <td>{a.published}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

export default FavBooks;
