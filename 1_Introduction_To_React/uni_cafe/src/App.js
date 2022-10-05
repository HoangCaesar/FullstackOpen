import { useState } from 'react';
import { Button, StatisticLine, Statistics } from './components';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const texts = ['good', 'neutral', 'bad']
  const quantities = [good, neutral, bad];

  let total = good + neutral + bad;


  const handleClick = (text) => {
    if (text === texts[0]) setGood(good + 1)
    else if (text === texts[1]) setNeutral(neutral + 1)
    else setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give a feed back</h1>
      {
        texts.map(
          text => <Button key={text} text={text} onClick={handleClick} />
        )
      }
      <h1>Satistics</h1>
      {
        total ?
          < Statistics quantities={quantities} texts={texts} />
          : <p>No feedback given</p>
      }
    </div>
  )
}

export default App