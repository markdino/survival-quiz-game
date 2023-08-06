import { SocketContext } from '@websocket'
import { GAME_TOPIC } from '@websocket/topics'
import React, { useContext } from 'react'

const StartGame = () => {
    const socket = useContext(SocketContext)

    const handleClick = () => {
        console.log("Start Game")
        socket.emit(GAME_TOPIC, {startGame: true})
        // Start Game logic here
    }

    return (
        <section className="flex flex-col items-center justify-center 
            w-1/4 h-1/3 mx-8 mb-8 absolute bottom-0 left-0
            border-4 rounded-md border-black">
                <button
                onClick={handleClick}
                className="px-16 py-8 ml-2 text-3xl bg-yellow-400 rounded-lg"
                >
                    Start Game
                </button>
        </section>
    )
}

export default StartGame