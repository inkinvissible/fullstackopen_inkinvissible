import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  
  const navigate = useNavigate()

  const contentField = useField('text')
  const authorField = useField('text')
  const infoField = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: contentField.input.value,
      author: authorField.input.value,
      info: infoField.input.value
    })
    navigate('/')

  }

  const resetFields = () => {
    contentField.reset()
    authorField.reset()
    infoField.reset()
    
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
           {...contentField.input}
            name='content'
          />
        </div>
        <div>
          author
          <input 
           {...authorField.input}
            name='author'
          />
        </div>
        <div>
          url for more info
          <input 
            {...infoField.input}
            name='info'
          />
        </div>
        <button>create</button>
        <button type='button' onClick={resetFields}>reset</button>
      </form>
    </div>
  )

}

// Props validation
CreateNew.propTypes = {
  addNew: PropTypes.func.isRequired
}

export default CreateNew