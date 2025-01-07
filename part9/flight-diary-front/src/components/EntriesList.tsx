import { Entry } from "../types"
const EntriesList = ({entries} : {entries : Entry[]}) =>{
    const style = {
        border: 'black',
        borderWidth: 2,
        borderRadius: 4,
        padding: 2,
        margin: 2
    }
    
    return (
        <>
        {entries.map(ent => (
            <div key={ent.id} style={style}>
                <h2>Date: {ent.date}</h2>
                <p>Visibility:  {ent.visibility}</p>
                <p>Weather: {ent.weather}</p>
                {ent.comment && <p>{ent.comment}</p>}
            </div>
        ))}
        </>    
    )
}

export default EntriesList