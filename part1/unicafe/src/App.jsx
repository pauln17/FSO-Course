import { useState } from 'react';
import Statistics from './components/Statistics';
import Button from './components/Button'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [feedback, setFeedback] = useState(false);

  const handleFeedback = (updatedValue) => {
    if (updatedValue) {
      setFeedback(true)
    }
  }

  return (
    <>
      <div>
        <div>give feedback</div>
        {/* <button onClick={() => {
          const updatedValue = good + 1
          setGood(updatedValue)
          handleFeedback(updatedValue)
        }}
        >
          good
        </button>
        <button onClick={() => {
          const updatedValue = neutral + 1
          setNeutral(updatedValue)
          handleFeedback(updatedValue)
        }}
        >
          neutral
        </button>
        <button onClick={() => {
          const updatedValue = bad + 1
          setBad(updatedValue)
          handleFeedback(updatedValue)
        }}
        >
          bad
        </button> */}
        <Button 
          data={good} 
          set={setGood}
          type={"good"} 
          handleFeedback={handleFeedback}
        />
        <Button 
          data={neutral} 
          set={setNeutral} 
          type={"neutral"} 
          handleFeedback={handleFeedback}
        />
        <Button 
          data={bad} 
          set={setBad} 
          type={"bad"} 
          handleFeedback={handleFeedback}
        />
      </div>
      {feedback ? (
        <>
          <div style={{marginTop: "15px"}}>
            <Statistics good={good} neutral={neutral} bad={bad}/>
          </div>
        </>
      ) : (
        <>
          <div style={{marginTop: "15px"}}>statistics</div>
          <div>no feedback given</div>
        </>
      )}
    </>
  )
}

export default App