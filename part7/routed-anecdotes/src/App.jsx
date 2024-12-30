import { useState } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'
import Menu from './Components/Menu'
import AnecdoteList from './Components/AnecdotesList'
import About from './Components/About'
import Footer from './Components/Footer'
import CreateNew from './Components/CreateNew'
import Anecdote from './Components/Anecdote'
import Notification from './Components/Notification'


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(an => an.id === Number(match.params.id)) : null



  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created!`)
    setTimeout(() => {
      setNotification('')
    }, 5000)
  }

  // const anecdoteById = (id) => anecdotes.find(a => a.id === id)

  // const vote = (id) => {
  //   const anecdote = anecdoteById(id)

  //   const voted = {
  //     ...anecdote,
  //     votes: anecdote.votes + 1
  //   }

  //   setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  // }

  return (
    <div>
      <Menu />
      <h1>Software anecdotes</h1>
      <Notification notification={notification} />
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} />} />
        <Route path={'/anecdotes/:id'} element={<Anecdote anecdote={anecdote} />} ></Route>
      </Routes>

      <Footer />
    </div>
  )
}

export default App
