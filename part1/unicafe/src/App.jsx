import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


const StatisticLine = ({text, value}) => {
if (text === "positive"){
  return <p>{text}: {value} %</p>
}
 return <p>{text}: {value}</p>
}

const Statistics = ({ good, neutral, bad, all }) => {
  let total = good + neutral + bad
  let average = ((good - bad) / total)
  let positive = (good / total) * 100

  if (all.length === 0) {
    return (
      <div>
        <Title title="statistics" />
        <p>No Feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <Title title="statistics" />
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={average} />
      <StatisticLine text="positive" value={positive} />

    </div>

  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])

  const handleGoodClick = () => {
    setGood(good + 1)
    setAll(all.concat('G'))
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setAll(all.concat('N'))
  }
  const handleBadClick = () => {
    setBad(bad + 1)
    setAll(all.concat('B'))
  }

  return (
    <>
      <Title title="give feedback" />
      <br />
      <div>
        <Button handleClick={handleGoodClick} text="good" />
        <Button handleClick={handleNeutralClick} text="neutral" />
        <Button handleClick={handleBadClick} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} />

    </>
  )
}

export default App