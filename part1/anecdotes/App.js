import React, { useState } from 'react'

const Header = ({ text }) => <h1>{text}</h1>;
const Anecdote = ({ anecdote }) => <p>{anecdote}</p>;
const Votes = ({ votes }) => <p>has {votes} votes</p>;
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [clicks, setClicks] = useState({
    selected: 0, votes: new Array(anecdotes.length).fill(0)
  });

  const handleNext = () => {
    let randomNumber = Math.floor(Math.random() * anecdotes.length)
    setClicks({ ...clicks, selected: randomNumber })
  }
    
  const handleVotes = () => {
    const copyVotes = [...clicks.votes];
    copyVotes[clicks.selected] += 1;
    setClicks({ ...clicks, votes: copyVotes })
  };

  const highestVotes = Math.max(...clicks.votes);
  const winningAnecdote = anecdotes[clicks.votes.indexOf(highestVotes)];

  return (
    <div>
      <Header text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[clicks.selected]} />
      <Votes votes={clicks.votes[clicks.selected]} />
      <Button handleClick={handleVotes} text="vote" />
      <Button handleClick={handleNext} text="next anecdote" />
      <Header text="Anecdote with most votes" />
      <Anecdote anecdote={winningAnecdote} />
      <Votes votes={highestVotes} />
    </div>
  )
}

export default App