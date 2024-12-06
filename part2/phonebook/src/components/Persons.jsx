import Person from './Person'

const Persons = ({ personsToShow, deletePerson }) => {
  if (!personsToShow){
    return null
  }
  return (
    <div>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
      ))}
    </div>
  )
}

export default Persons
