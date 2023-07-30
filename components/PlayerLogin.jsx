import { useState } from 'react'

const PlayerLogin = ({loginPlayer}) => {
    const [ playerName, setPlayerName ] = useState("")
    const [ playerReady, setPlayerReady ] = useState(false)

    // Player join
    const handleClick = () => {
        if (playerName.trim() === "") {
            alert("Please enter your player name.")
            return
        }
        setPlayerReady(true)
        loginPlayer(playerName)
    }

    // Render login component
    const renderLogin = () => (
        <div className="mx-auto container max-w-md text-center w_font-satoshi font-semibold">
                <label className="w_inherit text-base text-gray-700">
                    Input your Name
                </label>
                <div className="flex flex-row mt-4">
                <input
                    value={playerName}
                    onChange={(e) => setPlayerName(e.target.value)}
                    type="text"
                    placeholder="Player Name"
                    className="form_input w-full border"
                />
                <button
                    onClick={handleClick}
                    className="px-5 ml-2 text-sm bg-yellow-400 rounded-lg text-white"
                >
                    Enter
                </button>
                </div>
            </div>
    )

    // Render wait component
    const renderWait = () => (
        <div className='h-72 w-72 rounded-full bg-yellow-400 flex justify-center items-center'>
            <span className="text-xl">Waiting for other players</span>
        </div>
    )

    return (
        <section className="flex items-center justify-center m-24 py-24 absolute top-0">
            {!playerReady ? renderLogin() : renderWait()}
        </section>
    
  )
}

export default PlayerLogin