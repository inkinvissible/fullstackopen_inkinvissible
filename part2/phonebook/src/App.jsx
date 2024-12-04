import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])


  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')


  const addRegister = (e) => {
    e.preventDefault()

    const isRegisteredPerson = persons.some(person => person.name === newName)
    const isRegisteredNumber = persons.some(person => person.number === newNumber)

    if ((isRegisteredPerson === false) && (isRegisteredNumber === false)) {
      const newPerson = {
        name: newName,
        number: newNumber

      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
  }

  const personsToShow = searchPerson
    ? persons.filter(person =>
      person.name.toLowerCase().includes(searchPerson.toLowerCase())
    )
    : persons

  const handlePersonChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearchPerson(e.target.value)



  return (
    <div>
      <h2>Phonebook</h2>

      <Filter searchPerson={searchPerson} handleSearchChange={handleSearchChange}  />

      <h2>Add a new</h2>

      <PersonForm addRegister={addRegister} values={[newName, newNumber]} handleChanges={[handlePersonChange, handleNumberChange]}/>
      
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App