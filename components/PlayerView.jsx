import { useState, useEffect, useContext } from 'react'
import PlayerGame from './PlayerGame'
import PlayerLogin from './PlayerLogin'
import UserContext from '@store/UserContext'

// Dummy game data
const question = "What comes after Mercury?"
const choices = ["7/11", "McDonalds", "Venus", "Jollibee"]
const answer = "Venus"

const PlayerView = ({ data }) => {
  const [ startGame, setStartGame ] = useState(false)
  const [ player, setPlayer ] = useState("")
  const [ playerEliminated, setPlayerEliminated ] = useState(false)
  const [ showQuestion, setShowQuestion ] = useState(true)
  const [ showAnswer, setShowAnswer ] = useState(false)
  const [ startTimer, setStartTimer ] = useState(false)

  const { user } = useContext(UserContext)

  const playerExist = data.participants.some(
    (participant) => participant.user._id === user.id
  );

  // Game started component
  const renderGameStarted = () => (
    <div className='h-72 w-72 rounded-full bg-yellow-400 flex justify-center items-center'>
        <span className="text-xl text-center">The game has already started!</span>
    </div>
  )

  // Render game ui or game started
  const handleStartGame = () => {
    if (data.started) return renderGameStarted()
    return (
        <PlayerGame 
          question={question} 
          choices={choices} 
          answer={answer} 
          showQuestion={showQuestion}
          startTimer={startTimer} 
          checkAnswer={showAnswer}
          eliminatePlayer={setPlayerEliminated}/>
    )
  }

  useEffect(() => {
    console.log(`Is player eliminated? ${playerEliminated}`)
  }, [playerEliminated])

  return (
    <div className="flex items-center justify-center">
        { playerExist ? handleStartGame() : <PlayerLogin roomId={data._id} /> }
    </div>
  )
}

export default PlayerView