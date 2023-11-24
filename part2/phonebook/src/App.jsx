import axios from 'axios'
import { useEffect, useState } from 'react'
import NewPerson from './components/NewPerson'
import Persons from './components/Persons'
import Search from './components/Search'

const App = () => {
  const [persons, setPersons] = useState([])

  const [personsDisplay, setPersonsDisplay] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterReset, setFilterReset] = useState(false)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        setPersonsDisplay(response.data)
      })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Search
        filterReset={filterReset}
        setFilterReset={setFilterReset}
        persons={persons}
        setPersonsDisplay={setPersonsDisplay}
      />
      <NewPerson
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        setPersonsDisplay={setPersonsDisplay}
        setFilterReset={setFilterReset}
      />
      <h2>Numbers</h2>
      <Persons personsDisplay={personsDisplay} />
    </div>
  )
}

export default App