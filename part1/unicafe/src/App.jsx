import { useState } from 'react'

const Title = () => <h1>give feedback</h1>

const Statistics = ({good, neutral, bad}) => {
  // let total = good + neutral + bad
  // console.log("total ", total)

  // let average = (good + bad + neutral) / 3
  // console.log("average", average)

  // let positive = (good / total) * 100
  // console.log("positive", positive)

  return (
    <div>
      <h2>statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>


    </div>

  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)

  return (
    <>
    <Title />
    <br />
    <div>
      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>
    </div>
    <Statistics good={good} neutral={neutral} bad={bad} />

    </>
  )
}

export default App