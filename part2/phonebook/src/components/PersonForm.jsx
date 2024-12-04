const PersonForm = ({addRegister, values, handleChanges}) => {    
    return (
        <>
            <form onSubmit={addRegister}>
                <div>
                    name: <input value={values[0]} onChange={handleChanges[0]} />
                </div>
                <div>
                    number: <input value={values[1]} onChange={handleChanges[1]} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>)
}

export default PersonForm
