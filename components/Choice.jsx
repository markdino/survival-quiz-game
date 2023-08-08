import React from 'react'

const choiceStyle = "border-2 rounded-md border-black my-4 mx-48 p-2 text-xl";
const wrongChoiceStyle = "border-4 rounded-md border-black border-red-500 bg-red-500 my-4 mx-48 p-2 text-xl";

const Choice = ({choice, correctAnswer, players, revealAnswer}) => {
    const renderPlayers = (players) => {
        return (revealAnswer && !correctAnswer) ? (
            <div classname="mt-4">
                <span className="text-md bg-red-500 p-2 rounded-md">Players Out!</span>
            </div>
        ) : (
            <ul className="overflow-auto">
                {players ? players.map(player => <li key={player}>{player}</li>) : null}
            </ul>
        )
    }


  return (
    <div className="flex flex-col justify-center items-center m-8 w-36 h-36">
        <div className={(revealAnswer && !correctAnswer) ? wrongChoiceStyle : choiceStyle}>
            <span>{choice}</span>
        </div>
        <div className='mt-2 h-24'>
            {renderPlayers(players)}
        </div>
    </div>
  )
}

export default Choice