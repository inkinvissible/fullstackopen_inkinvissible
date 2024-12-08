const Person = ({person, deletePerson}) => <p key={person.id} >{person.name} {person.number} <button onClick={deletePerson}>Eliminar</button></p>
export default Person