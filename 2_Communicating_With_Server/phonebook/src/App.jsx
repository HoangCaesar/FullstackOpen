import { useState, useCallback, useEffect } from 'react'
import { Form, Search, Statistics } from './components'
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState([]);
  const newList = persons.filter(person => filter.includes(person.name.toLowerCase()))

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(
        res => {
          setPersons(prev => [...prev, ...res.data])
        }
      )
  }, [])
  

  const handleAdd = useCallback((name, number) => {
    setPersons(prev => [
      ...prev,
      {
        name,
        number
      }
    ])
  }, []);
  
  const handleFilter = useCallback((list) => {
    setFilter(list)
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Search statistics={persons} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <Form statistics={persons} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      {
        filter.length > 0 ?
          <Statistics statistics={newList} />
          :
          <Statistics statistics={persons} />
      }
    </div>
  )
}

export default App