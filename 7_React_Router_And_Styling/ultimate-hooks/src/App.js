// Project Import
import { useField, useResource } from './hooks';

// =====================================|| APP ||=====================================

const App = () => {
    const content = useField('text');
    const name = useField('text');
    const number = useField('text');

    const [notes, noteService] = useResource('notes');
    const [persons, personService] = useResource('persons');

    const handleNoteSubmit = async (event) => {
        event.preventDefault();
        await noteService.create({ content: content.value });
    };

    const handlePersonSubmit = async (event) => {
        event.preventDefault();
        await personService.create({ name: name.value, number: number.value });
    };

    return (
        <div>
            <h2>Notes</h2>
            <form onSubmit={handleNoteSubmit}>
                <input {...content} />
                <button>Create</button>
            </form>
            {notes.map((n) => (
                <p key={n.id}>{n.content}</p>
            ))}

            <h2>Persons</h2>
            <form onSubmit={handlePersonSubmit}>
                Name <input {...name} /> <br /> <br />
                Number <input {...number} />
                <button>Create</button>
            </form>
            {persons.map((n) => (
                <p key={n.id}>
                    {n.name} {n.number}
                </p>
            ))}
        </div>
    );
};

export default App;
