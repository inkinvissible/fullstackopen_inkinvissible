import Person from './Person'

const Persons = ({ personsToShow }) => {
  return (
    <div>
      {personsToShow.map(person => (
        <Person key={person.id} person={person} />
      ))}
    </div>
  )
}

export default Persons
