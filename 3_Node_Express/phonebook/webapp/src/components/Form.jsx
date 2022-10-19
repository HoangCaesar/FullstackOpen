import { useState, memo } from 'react'

const Form = ({ statistics, handleAdd,  handleUpdate }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const nameList = statistics.reduce((acc, statistic) => [...acc, statistic.name], [])

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeNumber = (e) => {
        setNumber(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const check = nameList.every(nameItem => nameItem !== name)
        if (check) handleAdd(name, number);
        else {
            const confirm = window.confirm(
                `${name} is already added to phonebook, replace the old number with a new one?`
            );
            const note = statistics.find(note => note.name === name)
            const newNote = {
                ...note,
                number
            }
            if (confirm) {
                handleUpdate(newNote)
            }
        }
        setName('');
        setNumber('');
    }

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100px', width: '200px' }}>
            <input type="text" value={name} onChange={handleChangeName} style={{ padding: '2px 0' }} />
            <input type="text" value={number} onChange={handleChangeNumber} style={{ padding: '2px 0' }} />
            <button type="submit" style={{ cursor: 'pointer' }}>Add</button>
        </form>
    )
}

export default memo(Form);