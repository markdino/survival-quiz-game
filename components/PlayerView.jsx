import { useState, useEffect } from 'react'
import PlayerGame from './PlayerGame'

// Dummy game data
const question = "What comes after Mercury?"
const choices = ["7/11", "McDonalds", "Venus", "Jollibee"]
const answer = "Venus"

const PlayerView = () => {
  const [ playerEliminated, setPlayerEliminated ] = useState(false)
  const [ showQuestion, setShowQuestion ] = useState(true)
  const [ showAnswer, setShowAnswer ] = useState(false)
  const [ startTimer, setStartTimer ] = useState(false)

  useEffect(() => {
    console.log(`Is player eliminated? ${playerEliminated}`)
  }, [playerEliminated])

  return (
    <div className="flex items-center justify-center">
        <PlayerGame 
          question={question} 
          choices={choices} 
          answer={answer} 
          showQuestion={showQuestion}
          startTimer={startTimer} 
          checkAnswer={showAnswer}
          eliminatePlayer={setPlayerEliminated}/>
    </div>
  )
}

export default PlayerView