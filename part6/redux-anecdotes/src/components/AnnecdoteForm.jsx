import { useDispatch } from "react-redux"
import { createAnnecdote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"
const AnnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnnecdote = async (e) => {
        e.preventDefault()
        const content = e.target.annecdote.value
        dispatch(createAnnecdote(content))
        dispatch(addNotification(`${content} successfully created`))
        setTimeout(() => {
            dispatch(addNotification(''))
        }, 5000)
        e.target.annecdote.value = ''

    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnnecdote}>
                <div><input name="annecdote" /></div>
                <button>create</button>
            </form>
        </div>
    )
}

export default AnnecdoteForm
