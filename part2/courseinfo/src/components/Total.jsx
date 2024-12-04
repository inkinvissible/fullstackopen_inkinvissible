const Total = ({ parts }) => {
    const sum = parts.reduce((total, part) => total + part.exercises, 0);
    
    return <strong>Total of exercises: {sum}</strong>

}

export default Total