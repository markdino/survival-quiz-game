import React from 'react'

const PlayerList = ({players}) => {
    const renderPlayerName = (player) =>  {
        return <li 
        key={player.id}
        className={`my-2 mx-4 text-xl flex justify-between items-center ${!player.isOnline ? "text-gray-300" : null}`}
        >
            {player.name}
            <div className={`bg-${player.isOnline ? "green" : "red"}-500 w-4 h-4 rounded-full ml-16`}></div>
        </li>
    }

  return (
    <section className="flex flex-col items-center justify-center 
        w-1/4 h-1/2 mt-24 mx-8 py-24 absolute top-0 left-0
        border-4 rounded-md border-black">
            <h3 className='my-16 text-2xl absolute top-0'>List of Players: </h3>
            <ul className="w-full p-8 my-4 overflow-auto">
                {players.map(player => renderPlayerName(player))}
            </ul>
    </section>
  )
}

export default PlayerList