import { useState, useCallback, useEffect } from 'react'
import { Form, Search, Statistics, Notification } from './components'
import personsApi from './api/personsApi';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState([]);
  const [message, setMessage] = useState('')
  const newList = persons.length > 0 && persons.filter(person => filter.includes(person.name.toLowerCase()))

  useEffect(() => {
    const getData = async () => {
      try {
        await personsApi
          .getAll()
          .then(res => setPersons(res))
      }
      catch (err) {
        console.log(err);
      }
    }
    getData();
  }, [])

  const handleAdd = useCallback((name, number) => {
    const note = { name, number };
    (async () => {
      try {
        await personsApi
          .addNote(note)
          .then(res => setPersons(prev => [...prev, res]))
      }
      catch (err) {
        console.log(err);
      }
    })();
    setMessage({ type: 'add', msg: `Added ${name}` })
  }, []);

  const handleDelete = useCallback((id, name) => {
    const confirm = window.confirm("Are you sure want to delete this note?");
    if (confirm) {
      (async () => {
        try {
          await personsApi.deleteNote(id)
          await personsApi
            .getAll()
            .then(res => setPersons(res))
        }
        catch (err) {
          console.log(err);
        }
      })();
      setMessage({ type: 'remove', msg: `${name}  has been removed out of list` });
    }
  }, []);

  const handleUpdate = useCallback((note) => {
    (async () => {
      try {
        await personsApi.updateNote(note)
        await personsApi
          .getAll()
          .then(res => setPersons(res))
      }
      catch (err) {
        console.log(err);
      }
    })();
    setMessage({ type: 'update', msg: `${note.name} has been updated with new number` });
  }, []);

  const handleFilter = useCallback((list) => {
    setFilter(list)
  }, []);

  const handleMessage = useCallback(() => {
    setMessage('')
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <Search statistics={persons} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      {message && <Notification message={message} handleMessage={handleMessage} />}
      <Form statistics={persons} handleAdd={handleAdd} handleUpdate={handleUpdate} />
      <h2>Numbers</h2>
      {
        filter.length > 0 ?
          <Statistics statistics={newList} handleDelete={handleDelete} />
          :
          <Statistics statistics={persons} handleDelete={handleDelete} />
      }
    </div>
  )
}

export default App