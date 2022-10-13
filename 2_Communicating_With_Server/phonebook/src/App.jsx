import { useState, useCallback, useEffect } from 'react'
import { Form, Search, Statistics } from './components'
import personsApi from './api/personsApi';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState([]);
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
  }, []);

  const handleDelete = useCallback((id) => {
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
  }, []);

  const handleFilter = useCallback((list) => {
    setFilter(list)
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search statistics={persons} handleFilter={handleFilter} />
      <h2>Add a new</h2>
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