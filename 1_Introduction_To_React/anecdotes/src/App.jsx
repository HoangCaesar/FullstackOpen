import { useState, useEffect } from 'react'

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0});
  const [highestVotes, setHighestVotes] = useState(0);

  useEffect(() => {
    let num = 0;
    let pos = 0;
    for(let i = 0; i<7; i++) {
      if(points[i] > num) {
        num = points[i];
        pos = i;
      }
    }
    setHighestVotes(pos)
  }, [points[0], points[1], points[2], points[3], points[4], points[5], points[6]])
  

  const handleClick = () => {
    const num = Math.floor(Math.random() * anecdotes.length);
    if (num != selected) setSelected(num);
  }

  const handleVote = () => {
    setPoints(prev => {
      return {
        ...prev,
       [selected]: prev[selected]+=1
      };
    })
  }
  return (
    <>
      <p>{anecdotes[selected]}</p>
      <button style={{ cursor: 'pointer', marginTop: '20px' }} onClick={handleClick}>Next Enecdote</button>
      <button style={{ cursor: 'pointer', margin: '20px 20px' }} onClick={handleVote}>Vote</button>
      <p>has {points[selected]} votes</p>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highestVotes]}</p>
      <p>has {points[highestVotes]} votes</p>
    </>
  )
}

export default App
