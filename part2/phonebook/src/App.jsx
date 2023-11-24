import axios from 'axios'
import { useEffect, useState } from 'react'
import NewPerson from './components/NewPerson'
import Persons from './components/Persons'
import Search from './components/Search'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [personsDisplay, setPersonsDisplay] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterReset, setFilterReset] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(returnedPersons => {
        setPersons(returnedPersons)
        setPersonsDisplay(returnedPersons)
      })
      .catch(error => {
        alert("Failed to retrieve data", error)
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
      <Persons
        personsDisplay={personsDisplay}
        setPersons={setPersons}
        setPersonsDisplay={setPersonsDisplay}
        persons={persons}
      />
    </div>
  )
}

export default App