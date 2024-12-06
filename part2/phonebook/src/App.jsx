import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchPerson, setSearchPerson] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  useEffect(() => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])






  const addRegister = (e) => {
    e.preventDefault()

    const isRegisteredPerson = persons.some(person => person.name === newName)
    const isRegisteredNumber = persons.some(person => person.number === newNumber)

    if ((!isRegisteredPerson) && (!isRegisteredNumber)) {
      const newPerson = {
        name: newName,
        number: newNumber

      }
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`${newPerson.name} was registered successfully`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })


    } else if ((isRegisteredPerson) && (!isRegisteredNumber)) {
      if (window.confirm(`${newName} is already added to phonebook, do you want to replace the old number with ${newNumber}?`)) {
        const changeNumberPerson = persons.find(person => person.name === newName)
        const changedNumberPerson = { ...changeNumberPerson, number: newNumber }

        personService.updateNumber(changeNumberPerson.id, changedNumberPerson).then(returnedPerson => {
          setPersons(persons.map(person => person.id !== changeNumberPerson.id ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`${returnedPerson.name}'s phone was changed successfully`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        }).catch(error => {
          setNotificationMessage(`An error has ocurred. ${newName} has already been removed from the server`)
          
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)

          setNewName('')
          setNewNumber('')

        })
      }
    } else {
      alert(`${newName} or ${newNumber} is already added to phonebook`)
    }
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}`)) {

      personService
        .deleteUser(id)
        .then(() => {
          const personsCopy = [...persons]
          setPersons(personsCopy.filter(p => p.id !== id))
        })
        .catch(() => {
          setNotificationMessage(`An error has ocurred. ${person.name} has already been removed from the server`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
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
      <Notification message={notificationMessage} />
      <Filter searchPerson={searchPerson} handleSearchChange={handleSearchChange} />

      <h2>Add a new</h2>

      <PersonForm addRegister={addRegister} values={[newName, newNumber]} handleChanges={[handlePersonChange, handleNumberChange]} />

      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App